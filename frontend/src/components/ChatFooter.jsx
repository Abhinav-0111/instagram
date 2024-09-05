import React, { useState } from "react";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { GrMicrophone } from "react-icons/gr";
import { GrGallery } from "react-icons/gr";
import { FaRegHeart } from "react-icons/fa6";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../redux/messageSlice";

const ChatFooter = () => {
    const [message, setmessage] = useState("");
    const { selectedUser, messages } = useSelector((state) => state.message);
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const onSubmitHandler = async () => {
        try {
            const res = await axios.post(
                `${window.location.origin}/send/${selectedUser?._id}`,
                {
                    id: user?._id,
                    message: message,
                }
            );
            if (res?.status === 200) {
                setmessage("");
                console.log(res);
                dispatch(setMessages([...messages, res?.data?.newMessage]));
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <>
            <div className="flex items-center w-full px-5 pt-4 pb-3">
                <div className="footer">
                    <MdOutlineEmojiEmotions
                        size={28}
                        className="cursor-pointer"
                    />
                    <input
                        type="text"
                        autoFocus
                        value={message}
                        onChange={(e) => {
                            setmessage(e.target.value);
                        }}
                        className="flex-1 outline-none text-[17px] text-black"
                    />
                    {message === "" ? (
                        <span className="flex items-center gap-4 mr-3">
                            <GrMicrophone
                                size={24}
                                className="cursor-pointer"
                            />
                            <GrGallery
                                size={24}
                                className="cursor-pointer"
                            />
                            <FaRegHeart
                                size={24}
                                className="cursor-pointer"
                            />
                        </span>
                    ) : (
                        <span
                            onClick={onSubmitHandler}
                            className="text-blue-600 text-[16px] font-semibold cursor-pointer mr-4"
                        >
                            Send
                        </span>
                    )}
                </div>
            </div>
        </>
    );
};

export default ChatFooter;
