const express = require("express"); // common js module syntax
// import express = require("express") // ES 15 syntax
const router = express.Router();
const {
  getPosts,
  createPost,
  updatePost,
  deletePost,
} = require("../controllers/postController");
const { protect } = require("../middleware/authMiddleware");

// We can chain the API routes
router.route("/").get(protect, getPosts).post(protect, createPost)
router.route("/:id").put(protect, updatePost).delete(protect, deletePost)

// router.get("/", protect, getPosts);
// router.post("/", protect, createPost);
// router.put("/:id", protect, updatePost);
// router.delete("/:id", post, deletePost);

module.exports = router;
