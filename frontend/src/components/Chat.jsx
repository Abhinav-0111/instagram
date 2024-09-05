import React, { useEffect } from "react";
import LeftChatBar from "./LeftChatBar";
import RightChatBar from "./RightChatBar";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getFollowingUser } from "../redux/messageSlice";

const Chat = () => {
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchFollowingUser = async () => {
            try {
                const res = await axios.get(
                    `https://instagram-1-3kzd.onrender.com/followinguser/${user?._id}`
                );
                dispatch(getFollowingUser(res?.data?.message));
            } catch (error) {
                console.log(error);
            }
        };
        fetchFollowingUser();
    }, []);
    return (
        <>
            <div className="flex w-full h-screen overflow-hidden">
                <LeftChatBar />
                <RightChatBar />
            </div>
        </>
    );
};

export default Chat;
