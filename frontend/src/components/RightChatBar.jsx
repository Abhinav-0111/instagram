import React, { useContext, useEffect } from "react";
import { IoCallOutline } from "react-icons/io5";
import { GoDeviceCameraVideo } from "react-icons/go";
import { MdInfoOutline } from "react-icons/md";
import ChatFooter from "./ChatFooter";
import Message from "./Message";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ContextApi from "../context/ContextApi";
import useGetMessages from "../hooks/useGetMessages";
import useGetRealTimeMessage from "../hooks/useGetRealTimeMessage";
import { getSelectedUser } from "../redux/messageSlice";

const RightChatBar = () => {
    const { selectedUser, messages } = useSelector((state) => state.message);
    const { setcategories } = useContext(ContextApi);
    const navigate = useNavigate();

    useGetMessages();
    useGetRealTimeMessage();

    return (
        <>
            {selectedUser ? (
                <>
                    <div className="flex flex-col h-full overflow-hidden w-full">
                        <div className="flex items-center justify-between p-4 border-b-[1px]">
                            <div className="flex items-center">
                                <div className="flex rounded-full overflow-hidden items-center justify-center h-11 w-11">
                                    <img
                                        src={
                                            selectedUser?.profilePhoto ||
                                            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdO2DCDcfM7yDAtEo797CkSw_njibgz-lOgw&s"
                                        }
                                        alt="logo"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <span className="ml-3 text-[18] font-semibold">
                                    {selectedUser?.name}
                                </span>
                            </div>
                            <div className="flex items-center gap-5">
                                <IoCallOutline
                                    className="cursor-pointer"
                                    size={28}
                                />
                                <GoDeviceCameraVideo
                                    className="cursor-pointer"
                                    size={28}
                                />
                                <MdInfoOutline
                                    className="cursor-pointer"
                                    size={28}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col overflow-y-auto w-full h-full">
                            <div className="flex w-full mb-6 mt-8 flex-col items-center justify-center">
                                <div className="flex rounded-full overflow-hidden items-center justify-center h-[150px] w-[150px]">
                                    <img
                                        src={
                                            selectedUser?.profilePhoto ||
                                            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdO2DCDcfM7yDAtEo797CkSw_njibgz-lOgw&s"
                                        }
                                        alt="logo"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <span className="text-[18px] font-semibold mt-3">
                                    {selectedUser?.name}
                                </span>
                                <p className="text-gray-400 leading-3">
                                    {selectedUser?.username}&nbsp;Instagram
                                </p>

                                <button
                                    onClick={() => {
                                        setcategories("Profile");
                                        navigate(
                                            `/profile/${selectedUser?._id}`
                                        );
                                    }}
                                    className="btn mt-6 text-black px-8"
                                >
                                    Profile
                                </button>
                            </div>
                            {messages &&
                                messages?.map((item) => {
                                    return (
                                        <>
                                            <Message
                                                key={item?._id}
                                                item={item}
                                            />
                                        </>
                                    );
                                })}
                        </div>
                        <ChatFooter />
                    </div>
                </>
            ) : (
                <>
                    <div className="flex flex-col w-full h-screen overflow-hidden items-center justify-center">
                        <span className="text-[20px] font-semibold">
                            Your messages
                        </span>
                        <span className="text-[15px] text-gray-400 mt-1">
                            Send a message to start a chat.
                        </span>
                    </div>
                </>
            )}
        </>
    );
};

export default RightChatBar;
