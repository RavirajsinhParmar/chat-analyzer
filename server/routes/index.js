const router = require("express").Router();
const multer = require("multer");
const { analyzeChat } = require("../services/analyzer");

const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    console.log(req.file, "files");
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });
    const data = await analyzeChat(req?.file?.path);
    res.json(data);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

module.exports = router;
