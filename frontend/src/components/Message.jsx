import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import extractTime from "../utils/exactTime";

const Message = ({ item }) => {
    const scroll = useRef();
    const { user } = useSelector((state) => state.user);
    const { selectedUser } = useSelector((state) => state.message);
    const formattedTime = extractTime(item?.createdAt);

    useEffect(() => {
        scroll.current?.scrollIntoView({ behavior: "smooth" });
    }, [item]);
    return (
        <>
            <div
                ref={scroll}
                className={`chat ${
                    user?._id === item?.senderId ? "chat-end" : "chat-start"
                }  pl-5 pr-5`}
            >
                <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                        <img
                            alt="Tailwind CSS chat bubble component"
                            src={
                                user?._id === item?.senderId
                                    ? user?.profilePhoto
                                    : selectedUser?.profilePhoto
                            }
                        />
                    </div>
                </div>
                <div className="chat-header">
                    <time className="text-xs opacity-50">{formattedTime}</time>
                </div>
                <div
                    className={`chat-bubble ${
                        user?._id === item?.senderId
                            ? "bg-[#942cd9]"
                            : "bg-[#F0F0F0] text-black"
                    }`}
                >
                    {item?.message}
                </div>
            </div>
        </>
    );
};

export default Message;
