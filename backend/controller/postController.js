import User from "../model/userSchema.js";
import sharp from "sharp";
import cloudinary from "../utils/cloudInary.js";
import Post from "../model/postSchema.js";
import Comment from "../model/commentSchema.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const createPost = async (req, res) => {
    try {
        const { id, caption } = req.body;
        const image = req.file;
        if (!image) {
            return res.status(401).json("Image required");
        }
        const optimizedImageBuffer = await sharp(image.buffer)
            .resize({
                width: 800,
                height: 800,
                fit: "inside",
            })
            .toFormat("jpeg", { quality: 80 })
            .toBuffer();
        const fileUri = `data:image/jpeg;base64,${optimizedImageBuffer.toString(
            "base64"
        )}`;
        const cloudResponse = await cloudinary.uploader.upload(fileUri);
        const post = await Post.create({
            caption,
            image: cloudResponse.secure_url,
            author: id,
        });
        const user = await User.findById(id);
        if (user) {
            user.posts.push(post._id);
            await user.save();
        }
        await post.populate({ path: "author", select: "-password" });
        return res.status(200).json({ Message: "New post created", post });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// export const getAllpost = async (req, res) => {
//     try {
//         const posts = await Post.find()
//             .sort({ createdAt: -1 })
//             .populate({ path: "author", select: "username profilePhoto name" })
//             .populate({
//                 path: "comments",
//                 sort: { createdAt: -1 },
//                 populate: {
//                     path: "author",
//                     select: "username profilePhoto name",
//                 },
//             });
//         return res.status(200).json({ posts });
//     } catch (error) {
//         return res.status(500).json({ error: error.message });
//     }
// };

export const getAllpost = async (req, res) => {
    try {
        const id = req.params.id;
        const loggedInUser = await User.findById(id);
        const loggedInUserPost = await Post.find({
            author: id,
        })
            .populate({ path: "author", select: "username profilePhoto name" })
            .populate({
                path: "comments",
                sort: { createdAt: -1 },
                populate: {
                    path: "author",
                    select: "username profilePhoto name",
                },
            });
        const followingUserId = await Promise.all(
            loggedInUser.following.map((otherUserId) => {
                return Post.find({ author: otherUserId })
                    .populate({
                        path: "author",
                        select: "username profilePhoto name",
                    })
                    .populate({
                        path: "comments",
                        sort: { createdAt: -1 },
                        populate: {
                            path: "author",
                            select: "username profilePhoto name",
                        },
                    });
            })
        );
        if (!loggedInUserPost && !followingUserId) {
            res.status(400).json({
                message: "No Tweet Yet",
            });
        }
        return res.status(200).json({
            message: loggedInUserPost.concat(...followingUserId),
        });
    } catch (error) {
        return res.status(500).json({ Error: error.message });
    }
};

export const getFollowingPost = async (req, res) => {
    try {
        const id = req.params.id;
        const loggedInUser = await User.findById(id);
        const followingUserId = await Promise.all(
            loggedInUser.following.map((otherUserId) => {
                return Post.find({ author: otherUserId })
                    .populate({
                        path: "author",
                        select: "username profilePhoto name",
                    })
                    .populate({
                        path: "comments",
                        sort: { createdAt: -1 },
                        populate: {
                            path: "author",
                            select: "username profilePhoto name",
                        },
                    });
            })
        );
        return res.status(200).json({
            message: [].concat(...followingUserId),
        });
    } catch (error) {
        return res.status(500).json({ Error: error.message });
    }
};

export const getUserPost = async (req, res) => {
    try {
        const { id } = req.body;
        const posts = await Post.find({ author: id })
            .sort({ createdAt: -1 })
            .populate({ path: "author", select: "username,profileImage" })
            .populate({
                path: "comments",
                sort: { createdAt: -1 },
                populate: { path: "author", select: "username,profileImage" },
            });
        return res.status(200).json({ posts });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const likeOrDislike = async (req, res) => {
    try {
        const loggedInUserId = req.body.id;
        const postId = req.params.id;
        const post = await Post.findById(postId);
        if (post.likes.includes(loggedInUserId)) {
            await Post.findByIdAndUpdate(postId, {
                $pull: { likes: loggedInUserId },
            });
            const user = await User.findById(loggedInUserId).select(
                "username profilePhoto"
            );
            const postOwnerId = post.author.toString();
            if (postOwnerId !== loggedInUserId) {
                const notification = {
                    type: "dislike",
                    userId: loggedInUserId,
                    userDetails: user,
                    postId,
                    message: "Your post was liked",
                };
                const postOwnerSocketId = getReceiverSocketId(postOwnerId);
                io.to(postOwnerSocketId).emit("notification", notification);
            }
            return res.status(200).json({ Message: "User dislike your post" });
        } else {
            await Post.findByIdAndUpdate(postId, {
                $push: { likes: loggedInUserId },
            });
            const user = await User.findById(loggedInUserId).select(
                "username profilePhoto"
            );
            const postOwnerId = post.author.toString();
            if (postOwnerId !== loggedInUserId) {
                const notification = {
                    type: "like",
                    userId: loggedInUserId,
                    userDetails: user,
                    postId,
                    message: "Your post was liked",
                };
                const postOwnerSocketId = getReceiverSocketId(postOwnerId);
                io.to(postOwnerSocketId).emit("notification", notification);
            }
            return res.status(200).json({ Message: "User like your post" });
        }
    } catch (error) {
        return res.status(500).json({ Error: error.message });
    }
};

export const addComment = async (req, res) => {
    try {
        const { id, text } = req.body;
        const postId = req.params.id;
        const post = await Post.findById(postId);
        const comment = await Comment.create({
            text,
            author: id,
            post: postId,
        });
        await comment.populate({
            path: "author",
            select: "username profilePhoto name",
        });
        post.comments.push(comment._id);
        await post.save();
        return res.status(200).json({ Message: "Comment added", comment });
    } catch (error) {
        return res.status(500).json({ Error: error.message });
    }
};

export const getComment = async (req, res) => {
    try {
        const postId = req.params.id;
        const comments = await Comment.find({ post: postId }).populate(
            "author",
            "username profileImage"
        );
        if (!comments) {
            return res
                .status(401)
                .json({ Message: "No comment found this post" });
        }
        return res.status(200).json({ comments });
    } catch (error) {
        return res.status(500).json({ Error: error.message });
    }
};

export const deletePost = async (req, res) => {
    try {
        const loggedInUserId = req.body.id;
        const postId = req.params.id;
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(401).json({ Message: "Post not found" });
        }
        if (post.author.toString() !== loggedInUserId) {
            return res.status(401).json({ Message: "Unauthorized" });
        }
        // delete post
        await Post.findByIdAndDelete(postId);
        // delete post id form user
        let user = await User.findById(loggedInUserId);
        user.posts = user.posts.filter((id) => id.toString() !== postId);
        await user.save();
        // delete comment
        await Comment.deleteMany({ post: postId });
        res.status(200).json({ Message: "Post delete Successfully" });
    } catch (error) {
        return res.status(500).json({ Error: error.message });
    }
};
