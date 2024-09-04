import User from "../model/userSchema.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/dataUri.js";
import cloudinary from "../utils/cloudInary.js";

export const userSignup = async (req, res) => {
    try {
        const { name, username, password, email } = req.body;
        const exist = await User.findOne({ username });
        const exist2 = await User.findOne({ email });
        if (exist) {
            return res.status(401).json("Username already exists");
        }
        if (exist2) {
            return res.status(401).json("Email already exists");
        }
        const hashedPassword = await bcryptjs.hash(password, 16);
        await User.create({
            name,
            username,
            password: hashedPassword,
            email,
        });
        return res
            .status(200)
            .json({ Message: "Account created successfully" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const userLogin = async (req, res) => {
    try {
        const { email, password, username } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json("Email not found");
        }
        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json("Invaild password");
        }
        const tokenData = {
            userId: user._id,
        };
        const token = await jwt.sign(tokenData, process.env.SECRET_TOKEN, {
            expiresIn: "1d",
        });
        return res
            .status(200)
            .cookie("token", token, {
                maxAge: 1 * 24 * 60 * 60 * 1000,
                httpOnly: true,
                sameSite: "strict",
            })
            .json({
                Message: `Welcome back ${user.name}`,
                user: {
                    _id: user._id,
                    name: user.name,
                    username: user.username,
                    email: user.email,
                    gender: user.gender,
                    profilePhoto: user.profilePhoto,
                    bio: user.bio,
                    followers: user.followers,
                    following: user.following,
                    posts: user.posts,
                    bookmarks: user.bookmarks,
                },
            });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const userLogout = async (req, res) => {
    try {
        return res
            .status(200)
            .cookie("token", "", { maxAge: 0 })
            .json({ message: "user logout successfully" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const getProfile = async (req, res) => {
    try {
        const id = req.params.id;
        let user = await User.findById(id)
            .populate({ path: "posts", createdAt: -1 })
            .populate("bookmarks")
            .select("-password");
        return res.status(200).json({ user });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const editProfile = async (req, res) => {
    try {
        const { loginUser, bio, gender } = req.body;
        const profilePhoto = req.file;
        var cloudResponse;
        if (profilePhoto) {
            const fileUri = getDataUri(profilePhoto);
            cloudResponse = await cloudinary.uploader.upload(fileUri);
        }
        const user = await User.findById(loginUser).select("-password");
        if (bio) {
            user.bio = bio;
        }
        if (gender) {
            user.gender = gender;
        }
        if (profilePhoto) {
            user.profilePhoto = cloudResponse.secure_url;
        }
        await user.save();
        return res.status(200).json({ message: "Profile updated", user });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const getOtherUsers = async (req, res) => {
    try {
        const { id } = req.params;
        const otherUser = await User.find({ _id: { $ne: id } }).select(
            "-password"
        );
        if (!otherUser) {
            return res
                .status(401)
                .json({ Message: "Currenty don't have any user" });
        }
        return res.status(200).json({ otherUser });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const followUser = async (req, res) => {
    try {
        const loginUserId = req.body.id;
        const userId = req.params.id;
        const loginUser = await User.findById(loginUserId);
        const user = await User.findById(userId);
        if (loginUserId === userId) {
            res.status(400).json("You can't follow yourself");
        }
        if (!loginUser || !user) {
            res.status(400).json("user not found");
        }
        if (!loginUser.following.includes(userId)) {
            await user.updateOne({ $push: { followers: loginUserId } });
            await loginUser.updateOne({ $push: { following: userId } });
        } else {
            return res
                .status(400)
                .json({ Message: `User already followed to ${user.name}` });
        }
        return res.status(200).json({
            Message: `${loginUser.name} just followed to ${user.name}`,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const unfollowUser = async (req, res) => {
    try {
        const loginUserId = req.body.id;
        const userId = req.params.id;
        const loginUser = await User.findById(loginUserId);
        const user = await User.findById(userId);
        if (loginUserId === userId) {
            res.status(400).json("You can't follow yourself");
        }
        if (!loginUser || !user) {
            res.status(400).json("user not found");
        }
        if (loginUser.following.includes(userId)) {
            await user.updateOne({ $pull: { followers: loginUserId } });
            await loginUser.updateOne({ $pull: { following: userId } });
        } else {
            return res
                .status(400)
                .json({ Message: `User has not followed yet` });
        }
        return res.status(200).json({
            Message: `${loginUser.name} unfollowed to ${user.name}`,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const userBookmark = async (req, res) => {
    try {
        const loginId = req.body.id;
        const tweetId = req.params.id;
        const user = await User.findById(loginId);
        if (user.bookmarks.includes(tweetId)) {
            await User.findByIdAndUpdate(loginId, {
                $pull: { bookmarks: tweetId },
            });
            return res.status(200).json({ Message: "Bookmark remove" });
        } else {
            await User.findByIdAndUpdate(loginId, {
                $push: { bookmarks: tweetId },
            });
            return res.status(200).json({ Message: "Bookmark save" });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
