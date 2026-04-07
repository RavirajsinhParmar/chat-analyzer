const express = require("express");
const cors = require("cors");
const routes = require("./routes");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(
  cors({
    origin: process.env.CLIENT_URL,
  }),
);
app.use(express.json());

app.use("/api", routes);

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`),
);
