import React from "react";
import StoryHeader from "./StoryHeader";
import Post from "./Post";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { followingUpdate } from "../redux/userSlice";
import { setRefresh } from "../redux/postSlice";
import axios from "axios";

const Feed = () => {
    const { posts } = useSelector((state) => state.posts);
    const { user, suggestedUser } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const followAndUnfollowing = async (id) => {
        if (user?.following?.includes(id)) {
            try {
                const res = await axios.post(
                    `https://instagram-1-3kzd.onrender.com/unfollow/${id}`,
                    {
                        id: user?._id,
                    }
                );
                dispatch(followingUpdate(id));
                dispatch(setRefresh());
                toast.success(res?.data?.Message);
            } catch (error) {
                console.log(error);
            }
        } else {
            try {
                const res = await axios.post(
                    `https://instagram-1-3kzd.onrender.com/follow/${id}`,
                    {
                        id: user?._id,
                    }
                );
                dispatch(followingUpdate(id));
                dispatch(setRefresh());
                toast.success(res?.data?.Message);
            } catch (error) {
                console.log(error);
            }
        }
    };
    return (
        <>
            <div className="flex w-full h-screen overflow-hidden overflow-y-auto">
                <div className="feed w-[65%] pl-[130px] pr-[85px]">
                    <StoryHeader />
                    <div className="flex flex-col mt-5 py-4 px-[78px]">
                        {posts.map((item) => {
                            return (
                                <>
                                    <Post
                                        key={item?._id}
                                        item={item}
                                    />
                                </>
                            );
                        })}
                    </div>
                </div>
                <div className="flex flex-col w-[35%] mt-8 pr-[140px]">
                    <div className="flex items-center w-full justify-between">
                        <Link to={`/profile/${user?._id}`}>
                            <div className="flex items-center">
                                <div className="flex items-center justify-center h-11 w-11 overflow-hidden rounded-full">
                                    <img
                                        src={
                                            user?.profilePhoto
                                                ? user?.profilePhoto
                                                : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdO2DCDcfM7yDAtEo797CkSw_njibgz-lOgw&s"
                                        }
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="flex items-start leading-[17px] flex-col ml-2">
                                    <span className="text-[15px] font-semibold">
                                        {user?.username}
                                    </span>
                                    <span className="text-[15px] text-gray-400">
                                        {user?.name}
                                    </span>
                                </div>
                            </div>
                        </Link>
                        <span className="text-[15px] text-blue-500 font-semibold cursor-pointer">
                            Switch
                        </span>
                    </div>
                    <span className="text-[15px] text-gray-400 font-semibold mt-6">
                        Suggested for you
                    </span>
                    <div className="flex flex-col w-full h-full overflow-y-auto">
                        {suggestedUser &&
                            suggestedUser.map((item) => {
                                return (
                                    <>
                                        <div
                                            key={item._id}
                                            className="flex items-center mt-4 w-full justify-between"
                                        >
                                            <Link to={`/profile/${item?._id}`}>
                                                <div className="flex items-center">
                                                    <div className="flex items-center justify-center h-11 w-11 overflow-hidden rounded-full">
                                                        <img
                                                            src={
                                                                item?.profilePhoto
                                                                    ? item?.profilePhoto
                                                                    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdO2DCDcfM7yDAtEo797CkSw_njibgz-lOgw&s"
                                                            }
                                                            className="w-full h-full aspect-square object-cover"
                                                        />
                                                    </div>
                                                    <div className="flex items-start leading-[17px] flex-col ml-2">
                                                        <span className="text-[15px] font-semibold">
                                                            {item?.username}
                                                        </span>
                                                        <span className="text-[15px] text-gray-400">
                                                            {item?.name}
                                                        </span>
                                                    </div>
                                                </div>
                                            </Link>
                                            <span
                                                onClick={() => {
                                                    followAndUnfollowing(
                                                        item?._id
                                                    );
                                                }}
                                                className="text-[15px] text-blue-500 font-semibold cursor-pointer"
                                            >
                                                {user?.following?.includes(
                                                    item?._id
                                                )
                                                    ? "Following..."
                                                    : "Follow"}
                                            </span>
                                        </div>
                                    </>
                                );
                            })}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Feed;
