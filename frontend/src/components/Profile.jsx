import React, { useState } from "react";
import ProfileDetails from "./ProfileDetails";
import useGetMyProfile from "../hooks/useGetMyProfile";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MdApps } from "react-icons/md";
import { FaRegBookmark } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaComment } from "react-icons/fa";
import axios from "axios";
import { followingUpdate } from "../redux/userSlice";
import { setRefresh } from "../redux/postSlice";
import { toast } from "react-toastify";

const Profile = () => {
    const { id } = useParams();
    const { profile, user } = useSelector((state) => state.user);
    const [active, setactive] = useState("post");
    const dispatch = useDispatch();
    useGetMyProfile(id);

    const activeHandler = (item) => {
        setactive(item);
    };

    const displayPost = active === "post" ? profile?.posts : profile?.bookmarks;

    const followAndUnfollowing = async () => {
        if (user?.following?.includes(id)) {
            try {
                const res = await axios.post(
                    `${window.location.origin}/unfollow/${id}`,
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
                    `${window.location.origin}/follow/${id}`,
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
            <div className="flex w-full h-full overflow-y-auto flex-col pt-8 px-[170px]">
                <ProfileDetails followAndUnfollowing={followAndUnfollowing} />
                <div className="flex flex-col w-full h-auto border-t-2 mt-[50px]">
                    <div className="flex w-full gap-[80px] items-center justify-center">
                        <span
                            onClick={() => {
                                activeHandler("post");
                            }}
                            className={`flex items-center cursor-pointer px-2 py-1  ${
                                active === "post" &&
                                "border-t-2 border-black font-semibold"
                            }`}
                        >
                            <MdApps className="mr-1" />
                            POSTS
                        </span>
                        <span
                            onClick={() => {
                                activeHandler("saved");
                            }}
                            className={`flex items-center cursor-pointer px-2 py-1  ${
                                active === "saved" &&
                                "border-t-2 border-black font-semibold"
                            }`}
                        >
                            <FaRegBookmark className="mr-1" />
                            SAVED
                        </span>
                    </div>
                    {displayPost && displayPost.length < 1 ? (
                        <div className="flex items-center justify-center w-full h-full mt-[50px] text-gray-400">
                            No post yet
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 pb-[50px] mt-[25px]">
                            {displayPost &&
                                displayPost.map((item) => {
                                    return (
                                        <>
                                            <div className="flex relative cursor-pointer group">
                                                <img
                                                    key={item._id}
                                                    src={item?.image}
                                                    alt="logo"
                                                    className="w-[500px] h-[300px] object-cover"
                                                />
                                                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 gap-7">
                                                    <div className="flex items-center ">
                                                        <FaHeart
                                                            color="white"
                                                            size={32}
                                                        />
                                                        <span className="text-white ml-2 font-semibold">
                                                            {
                                                                item?.likes
                                                                    ?.length
                                                            }
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center ">
                                                        <FaComment
                                                            color="white"
                                                            size={32}
                                                        />
                                                        <span className="text-white ml-2 font-semibold">
                                                            {
                                                                item?.comments
                                                                    ?.length
                                                            }
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    );
                                })}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Profile;
