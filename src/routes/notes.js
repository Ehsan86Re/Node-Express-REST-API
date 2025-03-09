const express = require("express");
const auth = require("../middleware/auth");
const Note = require("../models/Note");
const User = require("../models/User");
const router = express.Router();

// Get all notes for the authenticated user
router.get("/", auth, async (req, res) => {
  try {
    const notes = await Note.find({ $or: [{ owner: req.userId }, { sharedWith: req.userId }] });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new note
router.post("/", auth, async (req, res) => {
  const { title, content } = req.body;
  try {
    const note = new Note({ title, content, owner: req.userId });
    await note.save();
    res.status(201).json(note);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update a note by ID
router.put("/:id", auth, async (req, res) => {
  const { title, content } = req.body;
  try {
    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, owner: req.userId },
      { title, content },
      { new: true }
    );
    if (!note) return res.status(404).json({ error: "Note not found" });
    res.json(note);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a note by ID
router.delete("/:id", auth, async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({ _id: req.params.id, owner: req.userId });
    if (!note) return res.status(404).json({ error: "Note not found" });
    res.json({ message: "Note deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Share a note with another user
router.post("/:id/share", auth, async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  try {
    const note = await Note.findOne({ _id: id, owner: req.userId });
    if (!note) return res.status(404).json({ error: "Note not found" });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    note.sharedWith.push(userId);
    await note.save();
    res.json({ message: "Note shared successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;