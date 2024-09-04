import React, { useContext, useState } from "react";
// import { HiDotsHorizontal } from "react-icons/hi";
import { FaRegHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import { FaRegBookmark } from "react-icons/fa";
import CommentDigloue from "./CommentDigloue";
import ContextApi from "../context/ContextApi";
import { useDispatch, useSelector } from "react-redux";
import { MdDeleteOutline } from "react-icons/md";
import axios from "axios";
import { toast } from "react-toastify";
import { setRefresh, setSelectedPost } from "../redux/postSlice";
import { FaHeart } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import { bookmarkUpdate } from "../redux/userSlice";
import { Link } from "react-router-dom";

const Post = ({ item }) => {
    const [comment, setcommment] = useState("");
    const { open, setopen } = useContext(ContextApi);
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const deletePostHandler = async () => {
        try {
            const res = await axios.put(
                `https://instagram-3-u1yc.onrender.com/deletepost/${item?._id}`,
                {
                    id: user?._id,
                }
            );
            if (res.status === 200) {
                toast.success(res?.data?.Message);
                dispatch(setRefresh());
            }
        } catch (error) {
            console.log(error);
        }
    };

    const likeOrDislikeHandle = async (id) => {
        try {
            const res = await axios.put(
                `https://instagram-3-u1yc.onrender.com/likedislike/${item?._id}`,
                { id: id }
            );
            dispatch(setRefresh());
        } catch (error) {
            console.log(error);
        }
    };

    const commentHandler = async () => {
        try {
            const res = await axios.post(
                `https://instagram-3-u1yc.onrender.com/comment/${item?._id}`,
                { id: user?._id, text: comment }
            );
            if (res.status === 200) {
                dispatch(setRefresh());
                toast.success(res?.data?.Message);
                setcommment("");
            }
        } catch (error) {
            console.log(error);
        }
    };
    const bookmarkHandler = async () => {
        try {
            const res = await axios.put(
                `https://instagram-3-u1yc.onrender.com/bookmark/${item?._id}`,
                { id: user?._id }
            );
            dispatch(bookmarkUpdate(item?._id));
            toast.success(res?.data?.Message);
        } catch (error) {
            console.log(error);
        }
    };
    if (!item) {
        return;
    }
    return (
        <>
            <div className="flex flex-col items-center w-full ">
                <div className="flex items-center justify-between w-full py-3">
                    <div className="flex items-center">
                        <Link to={`/profile/${item?.author?._id}`}>
                            <div className="flex overflow-hidden h-9 w-9 rounded-full items-center justify-center cursor-pointer border-[3px] border-pink-600">
                                <img
                                    src={
                                        item?.author?.profilePhoto ||
                                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdO2DCDcfM7yDAtEo797CkSw_njibgz-lOgw&s"
                                    }
                                    alt="logo"
                                    className="w-full h-full aspect-square object-cover"
                                />
                            </div>
                        </Link>
                        <div className="flex flex-col ml-2">
                            <div className="flex items-center">
                                <span className="font-semibold">
                                    {item?.author?.name}
                                </span>
                                <span className="ml-2 font-bold mr-2">.</span>
                                <span>3d</span>
                                {user?._id === item?.author?._id && (
                                    <span className="ml-2 bg-gray-200 text-[13px] font-semibold px-3 flex items-center py-1 rounded-full">
                                        Author
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="flex">
                        {user && user?._id === item?.author?._id && (
                            <MdDeleteOutline
                                size={20}
                                className="cursor-pointer text-gray-500"
                                onClick={deletePostHandler}
                            />
                        )}
                    </div>
                </div>
                <div className="flex w-full h-auto overflow-hidden rounded-md">
                    <img
                        src={item?.image}
                        alt="logo"
                        className="h-full w-full object-cover"
                    />
                </div>
                <div className="flex items-center justify-between w-full mt-3">
                    <div className="flex items-center gap-6">
                        {item?.likes?.includes(user?._id) ? (
                            <>
                                <FaHeart
                                    onClick={() => {
                                        likeOrDislikeHandle(user?._id);
                                    }}
                                    size={25}
                                    className="cursor-pointer text-red-600 "
                                />
                            </>
                        ) : (
                            <FaRegHeart
                                onClick={() => {
                                    likeOrDislikeHandle(user?._id);
                                }}
                                size={25}
                                className="cursor-pointer hover:text-gray-400"
                            />
                        )}

                        <FaRegComment
                            size={25}
                            className="cursor-pointer hover:text-gray-400"
                            onClick={() => {
                                setopen(true);
                                dispatch(setSelectedPost(item));
                            }}
                        />
                        <FiSend
                            size={25}
                            className="cursor-pointer hover:text-gray-400"
                        />
                    </div>
                    <span>
                        {user?.bookmarks?.includes(item?._id) ? (
                            <FaBookmark
                                size={25}
                                onClick={bookmarkHandler}
                                className="cursor-pointer "
                            />
                        ) : (
                            <FaRegBookmark
                                size={25}
                                onClick={bookmarkHandler}
                                className="cursor-pointer hover:text-gray-400"
                            />
                        )}
                    </span>
                </div>
                <span className="items-start w-full mt-2 font-semibold">
                    {item?.likes?.length <= 1 ? (
                        <>{item?.likes?.length}&nbsp;like</>
                    ) : (
                        <>{item?.likes?.length}&nbsp;likes</>
                    )}
                </span>
                <div className="flex items-start w-full">
                    <span className="font-semibold mr-2">
                        {item?.author?.username}
                    </span>
                    <span>{item?.caption}</span>
                </div>
                <div
                    onClick={() => {
                        setopen(true);
                        dispatch(setSelectedPost(item));
                    }}
                    className="flex w-full items-start mt-1 text-gray-400 cursor-pointer"
                >
                    {` ${
                        item?.comments?.length < 1
                            ? "No comment yet"
                            : `View all ${item?.comments?.length} comments`
                    } `}
                </div>
                {open && <CommentDigloue />}
                <div className="flex w-full mt-1">
                    <input
                        type="text"
                        className="w-full outline-none pr-3"
                        placeholder="Add a comment..."
                        value={comment}
                        onChange={(e) => {
                            const inputText = e.target.value;
                            if (inputText.trim()) {
                                setcommment(inputText);
                            } else {
                                setcommment("");
                            }
                        }}
                    />
                    {comment ? (
                        <span
                            onClick={commentHandler}
                            className="text-blue-500 cursor-pointer font-semibold"
                        >
                            Post
                        </span>
                    ) : (
                        ""
                    )}
                </div>
            </div>
        </>
    );
};

export default Post;
