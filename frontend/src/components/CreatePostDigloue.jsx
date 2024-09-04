import React, { useRef, useState } from "react";
import { useContext } from "react";
import ContextApi from "../context/ContextApi";
import Dialog from "@mui/material/Dialog";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setRefresh } from "../redux/postSlice";

const CreatePostDigloue = () => {
    const [image, setimage] = useState("");
    const [caption, setCaption] = useState("");
    const [imgPreview, setimgPreview] = useState("");
    const [loading, setloading] = useState(false);
    const { user } = useSelector((state) => state.user);
    const { readFileAsDataURL, postdialog, setpostdialog } =
        useContext(ContextApi);
    const dispatch = useDispatch();

    const uploadFile = () => {
        document.getElementById("imgfile").click();
    };

    const handleChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            setimage(file);
            const dataUrl = await readFileAsDataURL(file);
            setimgPreview(dataUrl);
        }
    };

    const handleClose = () => {
        setpostdialog(false);
        setimgPreview("");
        setCaption("");
        setloading(false);
    };

    const createPostHandle = async () => {
        const formData = new FormData();
        formData.append("caption", caption);
        formData.append("id", user?._id);
        if (imgPreview) formData.append("image", image);
        try {
            setloading(true);
            const res = await axios.post(
                `https://instagram-3-u1yc.onrender.com/create`,
                formData
            );
            if (res.status === 200) {
                toast.success(res?.data?.Message);
                setCaption("");
                setimgPreview("");
                setimage("");
                setloading(false);
                setpostdialog(false);
                dispatch(setRefresh());
            }
        } catch (error) {
            toast.error(error?.response?.data?.error);
        } finally {
            setloading(false);
        }
    };

    return (
        <>
            <Dialog
                open={postdialog}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <div className="flex flex-col p-3 w-[500px] bg-white rounded-xl">
                    {/* header */}
                    <div className="flex items-start pb-2 border-b pl-1">
                        <p className="font-semibold w-full">Create new post</p>
                    </div>
                    <div className="flex items-center mt-2">
                        <div className="flex w-10 h-10 overflow-hidden rounded-full items-center justify-center">
                            <img
                                src={
                                    user?.profilePhoto
                                        ? user?.profilePhoto
                                        : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdO2DCDcfM7yDAtEo797CkSw_njibgz-lOgw&s"
                                }
                                alt="logo"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <p className="ml-2">{user?.name}</p>
                    </div>
                    <textarea
                        placeholder="Write a caption..."
                        className="w-full outline-none mt-2 pl-2"
                        value={caption}
                        onChange={(e) => {
                            setCaption(e.target.value);
                        }}
                    />
                    {imgPreview && (
                        <div className="flex items-center justify-center w-full h-64 overflow-hidden rounded-lg my-3">
                            <img
                                src={imgPreview}
                                alt="img"
                                className="h-full w-full object-cover"
                            />
                        </div>
                    )}
                    <div className="flex items-center justify-center w-full">
                        <input
                            type="file"
                            className="hidden"
                            id="imgfile"
                            onChange={handleChange}
                        />
                        <button
                            onClick={uploadFile}
                            className="bg-blue-600 rounded-md text-white font-semibold py-1 px-4"
                        >
                            Select from computer
                        </button>
                    </div>
                    {imgPreview ? (
                        <button
                            onClick={createPostHandle}
                            className="btn btn-neutral w-full mt-3"
                        >
                            {loading ? (
                                <span className="loading loading-spinner loading-md"></span>
                            ) : (
                                "Post"
                            )}
                        </button>
                    ) : (
                        <button
                            disabled
                            className="btn btn-neutral w-full mt-3"
                        >
                            Post
                        </button>
                    )}
                </div>
            </Dialog>
        </>
    );
};

export default CreatePostDigloue;
