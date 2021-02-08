const express = require("express");
const router = express.Router();
const Post = require("../schemas/Post");

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.json({ message: err.message });
  }
});

router.post("/", async (req, res) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
  });

  try {
    const newPost = await post.save();
    res.json(newPost);
  } catch (err) {
    res.json({ message: err.message });
  }
});

module.exports = router;
