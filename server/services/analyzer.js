const fs = require("fs");
const dayjs = require("dayjs");

// Clean weird unicode chars
function cleanLine(line) {
  return line
    .replace(/\u200E/g, "") // remove hidden chars
    .replace(/\u202F/g, " ") // fix narrow space
    .replace(/\u00A0/g, " ") // fix non-breaking space
    .trim();
}

// Flexible regex (handles ~, spaces, seconds, formats)
const regex =
  /^\[?(\d{1,2}\/\d{1,2}\/\d{2,4}),?\s(\d{1,2}:\d{2}(?::\d{2})?)\s?(AM|PM)?\]?\s?-?\s?~?\s?([^:]+):\s(.*)$/;

function normalize(dateStr) {
  const parts = dateStr.split("/");

  let day, month, year;

  if (parseInt(parts[0]) > 12) {
    day = parts[0];
    month = parts[1];
  } else {
    month = parts[0];
    day = parts[1];
  }

  year = parts[2].length === 2 ? "20" + parts[2] : parts[2];

  return dayjs(`${year}-${month}-${day}`).format("YYYY-MM-DD");
}

exports.analyzeChat = async (filePath) => {
  const raw = fs.readFileSync(filePath, "utf-8");
  const lines = raw.split("\n");

  let current = null;
  const messages = [];

  for (let line of lines) {
    line = cleanLine(line);

    const match = line.match(regex);

    if (match) {
      if (current) messages.push(current);

      current = {
        date: normalize(match[1]),
        user: match[4].trim(),
        text: match[5],
      };
    } else if (current) {
      // multiline fallback
      current.text += " " + line;
    }
  }

  if (current) messages.push(current);

  const dailyActive = {};
  const joins = {};
  const userDays = {};

  messages.forEach(({ date, user, text }) => {
    if (!user || user.toLowerCase().includes("message")) return;

    dailyActive[date] = dailyActive[date] || new Set();
    dailyActive[date].add(user);

    userDays[user] = userDays[user] || new Set();
    userDays[user].add(date);

    if (/joined|added|invite|left|removed/i.test(text)) {
      joins[date] = (joins[date] || 0) + 1;
    }
  });

  const dates = Object.keys(dailyActive).sort().slice(-7);

  const chart = dates.map((d) => ({
    date: d,
    active: dailyActive[d]?.size || 0,
    joined: joins[d] || 0,
  }));

  const consistentUsers = Object.entries(userDays)
    .filter(([_, days]) => days.size >= 4)
    .map(([u]) => u);

  return { chart, consistentUsers };
};
