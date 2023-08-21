const express = require ("express");
const getPosts = require("../controllers/posts/getPosts.js");
const getSinglePost = require("../controllers/posts/getSinglePost.js");
const addPost = require("../controllers/posts/addPost.js");
const deletePost = require("../controllers/posts/deletePost2.js");
const updatePost = require("../controllers/posts/updatePost.js");

const router = express.Router();

router.get("/", getPosts)
router.get("/:id", getSinglePost)
router.post("/", addPost)
router.delete("/:id", deletePost)
router.put("/:id", updatePost)

module.exports = router;