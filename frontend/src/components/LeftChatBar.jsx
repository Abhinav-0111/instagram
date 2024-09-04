import React, { useContext } from "react";
import { BiMessageAltEdit } from "react-icons/bi";
import UserPost from "./UserPost";
import { useSelector } from "react-redux";
import ContextApi from "../context/ContextApi";

const LeftChatBar = () => {
    const { followingUser } = useSelector((state) => state.message);
    const { user } = useSelector((state) => state.user);
    return (
        <>
            <div className="flex w-[37%] h-full overflow-hidden flex-col bg-white border-r-[1px]">
                <div className="flex items-center justify-between pt-[40px] pb-4 px-4">
                    <span className="text-[22px] cursor-pointer font-bold">
                        {user?.username}
                    </span>
                    <span>
                        <BiMessageAltEdit
                            size={28}
                            className="cursor-pointer"
                        />
                    </span>
                </div>
                <div className="flex flex-col h-full w-full overflow-y-auto">
                    <div className="flex items-center justify-between pt-[18px] px-4 mb-4">
                        <span className="text-[16px] font-bold">Messages</span>
                        <span className="text-gray-400 cursor-pointer font-semibold">
                            Request
                        </span>
                    </div>
                    {followingUser?.map((item) => {
                        return (
                            <>
                                <UserPost
                                    key={item?._id}
                                    item={item}
                                />
                            </>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default LeftChatBar;
