import express from "express";

import {getUser , updateUser , deleteUser, followUser, unfollowUser, getFriends, getAllUsers} from "../controllers/users.js"

const router = express.Router();

// get user by query paramerters (either username or userId)
router.get("/" , getUser);

// update user by id
router.patch("/:id" ,updateUser);

// delete user by id
router.delete("/:id",deleteUser);

// follow user
router.put("/:id/follow",followUser);
  
// unfollow user
router.put("/:id/unfollow" , unfollowUser);

// friendsList
router.get("/friends/:userId" , getFriends );

// get all users
router.get("/all" , getAllUsers);


export default router; 