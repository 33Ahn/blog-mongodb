// When interactiong with a DB, it will return a PROMISE ---> so use ASYNC/AWAIT
// For error handling when use ASYNC/AWAIT ---> use TRY/CATCH
// If don't want to use TRY/CATCH ---> use Express ASYNC HANDLER ( npm install express-async-handler)
// Then wrap the entire function with "asyncHander()"

const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Post = require("../models/postModel");

// @desc Get posts
// @route GET /api/posts
// @access Private
const getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({
    // Get the specific user's posts, have access to 'req.user.id' due to the 'protect' authMiddleware
    user: req.user.id,
  });
  console.log(posts);
  res.status(200).json(posts);
});

// @desc Create post
// @route POST /api/posts
// @access Private
const createPost = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text field");
  }

  const post = await Post.create({
    user: req.user.id,
    text: req.body.text,
  });

  res.json(post);
});

// @desc Update post
// @route PUT /api/posts/:id
// @access Private
const updatePost = asyncHandler(async (req, res) => {
  // Get the post by id which is in the url
  const post = await Post.findById(req.params.id);

  if (!post) {
    res.status(400);
    throw new Error("Post not found");
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Make sure the logged in user matches the post user
  if (post.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  }); // 3rd argument with options obj which will create it if it doesn't exist

  res.status(200).json(updatedPost);
});

// @desc Delete post
// @route DELETE /api/posts/:id
// @access Private
const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    res.status(400);
    throw new Error("Post not found");
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Make sure the logged in user matches the post user
  if (post.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await Post.findByIdAndDelete(req.params.id);

  // Return the deleted post id for the frontend
  res.status(200).json({ _id: req.params.id });
});

module.exports = {
  getPosts,
  createPost,
  updatePost,
  deletePost,
};
