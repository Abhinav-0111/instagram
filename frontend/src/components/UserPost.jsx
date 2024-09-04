import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSelectedUser } from "../redux/messageSlice";
import ContextApi from "../context/ContextApi";

const UserPost = ({ item }) => {
    const dispatch = useDispatch();
    const { activeSelectedUser, handleSelectedUser } = useContext(ContextApi);
    const { onlineUsers } = useSelector((state) => state.user);
    const isOnline = onlineUsers?.includes(item._id);

    return (
        <>
            <div
                onClick={() => {
                    dispatch(getSelectedUser(item));
                    handleSelectedUser(item?._id);
                }}
                className={`flex items-center ${
                    activeSelectedUser === item?._id ? "bg-gray-100" : ""
                } w-full hover:bg-gray-100 cursor-pointer py-3 px-4`}
            >
                <div className="flex rounded-full items-center justify-center h-14 w-14 overflow-hidden">
                    <img
                        src={
                            item?.profilePhoto ||
                            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdO2DCDcfM7yDAtEo797CkSw_njibgz-lOgw&s"
                        }
                        alt="logo"
                        className="w-full h-full object-cover overflow-hidden"
                    />
                </div>
                <div className="flex flex-col ml-3 text-[17px] font-semibold">
                    <span>{item?.name}</span>
                    {isOnline ? (
                        <span className="text-[13px] text-green-600 font-semibold">
                            Online
                        </span>
                    ) : (
                        <span className="text-[13px] text-red-600 font-semibold">
                            Offline
                        </span>
                    )}
                </div>
            </div>
        </>
    );
};

export default UserPost;
