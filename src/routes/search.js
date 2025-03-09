const express = require("express");
const auth = require("../middleware/auth");
const Note = require("../models/Note");
const router = express.Router();

router.get("/", auth, async (req, res) => {
    const { q } = req.query;
    try {
      const notes = await Note.find(
        { $text: { $search: q }, $or: [{ owner: req.userId }, { sharedWith: req.userId }] },
        { score: { $meta: "textScore" } }
      ).sort({ score: { $meta: "textScore" } });
      res.json(notes);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
});

module.exports = router;
