import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            max: 18,
            min: 4,
            trim: true,
            lowercase: true,
            unique: true,
        },
        name: {
            type: String,
            required: true,
            max: 20,
            min: 4,
            trim: true,
        },
        password: {
            type: String,
            required: true,
        },
        profilePhoto: {
            type: String,
            default: "",
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        bio: {
            type: String,
            default: "",
        },
        gender: {
            type: String,
            enum: ["male", "female"],
        },
        followers: {
            type: Array,
            default: [],
        },
        following: {
            type: Array,
            default: [],
        },
        posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
        bookmarks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    },
    { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
