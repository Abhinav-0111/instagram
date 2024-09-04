import Conversation from "../model/conversation.js";
import Message from "../model/messageSchema.js";
import User from "../model/userSchema.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
    try {
        const senderId = req.body.id;
        const recevierId = req.params.id;
        const { message } = req.body;
        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, recevierId] },
        });
        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, recevierId],
            });
        }
        const newMessage = await Message.create({
            senderId,
            recevierId,
            message,
        });
        if (newMessage) {
            conversation.messages.push(newMessage._id);
        }
        await Promise.all([conversation.save(), newMessage.save()]);
        const receiverSocketId = getReceiverSocketId(recevierId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }
        return res.status(200).json({ newMessage });
    } catch (error) {
        return res.status(500).json({ err: err.message });
    }
};

export const getMessage = async (req, res) => {
    try {
        const senderId = req.body.id;
        const recevierId = req.params.id;
        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, recevierId] },
        }).populate("messages");
        return res.status(200).json(conversation?.messages);
    } catch (error) {
        return res.status(500).json({ err: error.message });
    }
};

export const deleteMessage = async (req, res) => {
    try {
        const { id } = req.params;
        await Message.findByIdAndDelete(id);
        return res.status(200).json({ Message: "Tweet Delete successfully" });
    } catch (error) {
        return res.status(500).json({ err: err.message });
    }
};

export const followingUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const loggedInUser = await User.findById(userId);
        const followingUserId = await Promise.all(
            loggedInUser.following.map((otherUserId) => {
                return User.findById(otherUserId).select(
                    "profilePhoto name username"
                );
            })
        );
        return res.status(200).json({
            message: followingUserId,
        });
    } catch (error) {
        return res.status(500).json({ Error: error.message });
    }
};
