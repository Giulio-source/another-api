const express = require("express");
const router = express.Router();
const Post = require("../schemas/Post");

router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.json(post);
  } catch (err) {
    res.json({ id: req.params.id, message: err.message });
  }
});

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

router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    post.remove();
    res.json({ message: "Post was successfully removed" });
  } catch (err) {
    res.json({ id: req.params.id, message: err.message });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (req.body.title) {
      post.title = req.body.title;
      post.save();
      res.json({ message: "Name changed successffuly" });
    }
    if (req.body.content) {
      post.content = req.body.content;
      post.save();
      res.json({ message: "Name changed successffuly" });
    }
  } catch (err) {
    res.json({ id: req.params.id, message: err.message });
  }
});

module.exports = router;
