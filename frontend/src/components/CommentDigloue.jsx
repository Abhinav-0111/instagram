import React, { useContext, useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import ContextApi from "../context/ContextApi";
import { HiDotsHorizontal } from "react-icons/hi";
import { FaRegSmile } from "react-icons/fa";
import Commentbox from "./Commentbox";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
    commentUpdate,
    setPosts,
    setRefresh,
    updateSelectedComment,
} from "../redux/postSlice";
import { toast } from "react-toastify";
import { followingUpdate } from "../redux/userSlice";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
        padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
        padding: theme.spacing(1),
    },
}));

export default function CommentDigloue() {
    const { open, setopen, open2, setopen2 } = useContext(ContextApi);
    const [text, settext] = useState("");
    const { selectedPost, posts } = useSelector((state) => state.posts);
    const [comment, setcomment] = useState([]);
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const handleClose = () => {
        setopen(false);
    };
    const handleClose2 = () => {
        setopen2(false);
    };

    useEffect(() => {
        if (selectedPost) {
            setcomment(selectedPost.comments);
        }
    }, [selectedPost]);
    const commentHandler = async () => {
        try {
            const res = await axios.post(
                `https://instagram-1-3kzd.onrender.com/comment/${selectedPost?._id}`,
                { id: user?._id, text }
            );
            if (res.status === 200) {
                const updateCommentData = [...comment, res?.data?.comment];
                setcomment(updateCommentData);
                dispatch(setRefresh());
                toast.success(res?.data?.Message);
                settext("");
            }
        } catch (error) {
            console.log(error);
        }
    };

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
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <div className="flex max-w-[1124px] h-[650px] overflow-hidden items-center bg-white">
                    <div className="flex w-[50%] h-full">
                        <img
                            src={selectedPost?.image}
                            alt="logo"
                            className="w-full h-full object-cover "
                        />
                    </div>
                    <div className="flex flex-col w-[50%] h-full px-3">
                        <div className="flex sticky items-center w-full justify-between py-2 mt-1 border-b">
                            <div className="flex items-center ">
                                <div className="flex overflow-hidden items-center justify-center h-9 w-9 rounded-full">
                                    <img
                                        src={
                                            selectedPost?.author?.profilePhoto
                                                ? selectedPost?.author
                                                      ?.profilePhoto
                                                : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdO2DCDcfM7yDAtEo797CkSw_njibgz-lOgw&s"
                                        }
                                        alt="logo"
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                                <span className="font-semibold ml-2">
                                    {selectedPost?.author?.name}
                                </span>
                            </div>
                            <span>
                                <HiDotsHorizontal
                                    size={18}
                                    className="cursor-pointer"
                                    onClick={() => {
                                        setopen2(true);
                                    }}
                                />
                            </span>
                        </div>
                        <div className="flex flex-col w-full h-full overflow-hidden  overflow-y-auto mt-4">
                            <div className="flex items-center mb-5">
                                <div className="flex overflow-hidden items-center justify-center h-9 w-9 rounded-full">
                                    <img
                                        src={
                                            selectedPost?.author?.profilePhoto
                                                ? selectedPost?.author
                                                      ?.profilePhoto
                                                : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdO2DCDcfM7yDAtEo797CkSw_njibgz-lOgw&s"
                                        }
                                        alt="logo"
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                                <span className="font-semibold ml-2">
                                    {selectedPost?.author?.name}
                                </span>
                                <span className="ml-2">
                                    {selectedPost?.caption}
                                </span>
                            </div>
                            {comment?.length < 1 ? (
                                <div className="w-full h-full text-gray-400 flex items-center justify-center">
                                    no comment yet
                                </div>
                            ) : (
                                comment.map((item) => {
                                    return (
                                        <>
                                            <Commentbox
                                                key={item._id}
                                                item={item}
                                            />
                                        </>
                                    );
                                })
                            )}
                        </div>

                        {/* Footer */}
                        <div className="flex items-center p-4">
                            <FaRegSmile
                                size={22}
                                className="cursor-pointer"
                            />
                            <input
                                type="text"
                                placeholder="Add a comment..."
                                value={text}
                                onChange={(e) => {
                                    const inputText = e.target.value;
                                    if (inputText.trim()) {
                                        settext(inputText);
                                    } else {
                                        settext("");
                                    }
                                }}
                                className="w-full outline-none p-2 ml-2"
                            />
                            {text && (
                                <span
                                    onClick={commentHandler}
                                    className="text-blue-600 font-semibold cursor-pointer"
                                >
                                    Post
                                </span>
                            )}
                        </div>
                    </div>
                </div>
                <BootstrapDialog
                    onClose={handleClose2}
                    aria-labelledby="customized-dialog-title"
                    open={open2}
                >
                    <div className="flex flex-col rounded-md w-[500px] bg-white">
                        <span
                            onClick={() => {
                                followAndUnfollowing(selectedPost?.author?._id);
                            }}
                            className="p-5 text-red-500 hover:bg-gray-200 font-semibold cursor-pointer"
                        >
                            {user?.following?.includes(
                                selectedPost?.author?._id
                            )
                                ? "Following..."
                                : "Follow"}
                        </span>
                        <span className="p-5  hover:bg-gray-200 font-semibold cursor-pointer">
                            Add to favorites
                        </span>
                    </div>
                </BootstrapDialog>
            </BootstrapDialog>
        </>
    );
}
