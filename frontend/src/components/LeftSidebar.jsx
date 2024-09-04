import React, { useContext } from "react";
import { options } from "../services/constant";
import { FaInstagram } from "react-icons/fa6";
import ContextApi from "../context/ContextApi";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../redux/userSlice";
import CreatePostDigloue from "./CreatePostDigloue";
import { setPosts } from "../redux/postSlice";
import { getSelectedUser } from "../redux/messageSlice";
import { Button, Popover, Typography } from "@mui/material";
import { setLikeNotification } from "../redux/rtnSlice";

const LeftSidebar = () => {
    const { categories, handleCategories, setpostdialog, handleSelectedUser } =
        useContext(ContextApi);
    const { user } = useSelector((state) => state.user);
    const { likeNotification } = useSelector(
        (state) => state.realTimeNotification
    );
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const logoutUser = async () => {
        dispatch(getUser(null));
        dispatch(setPosts([]));
        navigate("/register");
    };

    const linkHandler = (item) => {
        if (item === "Notifications") {
            navigate("/notification");
            dispatch(getSelectedUser(null));
            handleSelectedUser(null);
        } else if (item === "Profile") {
            navigate(`/profile/${user?._id}`);
            dispatch(getSelectedUser(null));
            handleSelectedUser(null);
        } else if (item === "Search") {
            navigate("/search");
        } else if (item === "Explore") {
            navigate("/explore");
        } else if (item === "Messages") {
            navigate("/chat");
        } else if (item === "Create") {
            setpostdialog(true);
        } else if (item === "Logout") {
            logoutUser();
        } else if (item === "Home") {
            navigate("/");
            dispatch(getSelectedUser(null));
            handleSelectedUser(null);
        }
    };
    return (
        <>
            <div
                className={`flex overflow-hidden  flex-col border-r-2 w-full h-screen  ${
                    categories === "Messages" ? "pl-2" : "pl-[20px]"
                } pr-2`}
            >
                {categories === "Messages" ? (
                    <span className="w-full items-center justify-center">
                        <FaInstagram
                            size={25}
                            className="w-full mt-10 mb-5"
                        />
                    </span>
                ) : (
                    <img
                        src="https://1000logos.net/wp-content/uploads/2017/02/Logo-Instagram.png"
                        alt="logo"
                        className="w-[150px] mt-2"
                    />
                )}

                <div className="flex flex-col w-full mt-2">
                    <CreatePostDigloue />
                    {options.map((item) => {
                        return (
                            <>
                                <div
                                    onClick={() => {
                                        handleCategories(item?.name);
                                        linkHandler(item?.name);
                                    }}
                                    className={`flex h-screen overflow-hidden ${
                                        categories === "Messages"
                                            ? "justify-center"
                                            : ""
                                    } mb-1 transition-transform items-center w-full hover:bg-[#F2F2F2] ${
                                        categories === item?.name
                                            ? "font-bold"
                                            : ""
                                    } p-3 rounded-lg cursor-pointer`}
                                >
                                    <span className="text-black relative">
                                        {item.icon}
                                    </span>
                                    {item?.name === "Notifications" && (
                                        <button
                                            size="icon"
                                            className="flex items-center justify-center rounded-full h-5 w-5 bg-red-500 hover:bg-red-500 text-white absolute bottom-6 left-7"
                                        >
                                            {likeNotification?.length}
                                        </button>
                                    )}
                                    <span>
                                        {item.avatar ? (
                                            <>
                                                <div className="flex overflow-hidden h-7 w-7 rounded-full items-center justify-center">
                                                    <img
                                                        src={
                                                            user?.profilePhoto
                                                                ? user?.profilePhoto
                                                                : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdO2DCDcfM7yDAtEo797CkSw_njibgz-lOgw&s"
                                                        }
                                                        alt="profile"
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                            </>
                                        ) : (
                                            ""
                                        )}
                                    </span>
                                    {categories === "Messages" ? (
                                        ""
                                    ) : (
                                        <span className="text-[17px] ml-3">
                                            {item.name}
                                        </span>
                                    )}
                                </div>
                            </>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default LeftSidebar;
