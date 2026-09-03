const express = require("express");
const multer = require("multer");
const router = express.Router();
const upload = multer();

// Public endpoint — accepts profile photo uploads from any
// authenticated user, no admin/internal restriction.
router.post("/api/users/:id/avatar", upload.single("avatar"), (req, res) => {
  // ...stores req.file to the avatar bucket
  res.json({ ok: true });
});

module.exports = router;
