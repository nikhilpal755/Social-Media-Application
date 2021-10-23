import express from "express";
const router = express.Router();

import {createPost, getPost, updatePost, deletePost, likePost, timelinePost , userPosts, userComment, getComments} from "../controllers/posts.js";

//create a post
router.post("/",createPost);

//get a post
router.get("/:id", getPost);

//update a post
router.put("/:id", updatePost);

//delete a post
router.delete("/:id", deletePost);

//like / dislike a post
router.put("/:id/like", likePost);

//get timeline posts
router.get("/timeline/:userId",timelinePost);

//get  userPosts
router.get("/profile/:username", userPosts);

// post comment
router.post("/:postId/comment", userComment);

// get comments
router.get("/:postId/comments", getComments);


export default router; 