import express from "express";
import {
    editProfile,
    followUser,
    getOtherUsers,
    getProfile,
    unfollowUser,
    userBookmark,
    userLogin,
    userLogout,
    userSignup,
} from "../controller/userController.js";
import upload from "../middleware/multer.js";
import {
    deleteMessage,
    followingUser,
    getMessage,
    sendMessage,
} from "../controller/messageController.js";
import {
    addComment,
    createPost,
    deletePost,
    getAllpost,
    getComment,
    getFollowingPost,
    getUserPost,
    likeOrDislike,
} from "../controller/postController.js";

const router = express.Router();
router.post("/signup", userSignup);
router.post("/login", userLogin);
router.get("/logout", userLogout);
router.get("/profile/:id", getProfile);
router.put("/bookmark/:id", userBookmark);
router.post("/follow/:id", followUser);
router.post("/unfollow/:id", unfollowUser);
router.get("/otheruser/:id", getOtherUsers);
router.post("/profile/edit", upload.single("profilePhoto"), editProfile);
router.post("/send/:id", sendMessage);
router.put("/message/:id", getMessage);
router.delete("/delete/:id", deleteMessage);
router.post("/create", upload.single("image"), createPost);
// router.get("/all", getAllpost);
router.get("/getallpost/:id", getAllpost);
router.get("/followingpost/:id", getFollowingPost);
router.get("/userpost", getUserPost);
router.put("/likedislike/:id", likeOrDislike);
router.post("/comment/:id", addComment);
router.get("/getcomment/:id", getComment);
router.put("/deletepost/:id", deletePost);
router.get("/followinguser/:id", followingUser);

export default router;
