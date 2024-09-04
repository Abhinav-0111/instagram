import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getUser } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const EditProfile = () => {
    const { user } = useSelector((state) => state.user);
    const [bio, setbio] = useState(user?.bio || "bio");
    const [profilePhoto, setprofilePhoto] = useState("");
    const [gender, setgender] = useState(user?.gender || "male");
    const [loading, setloading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            setprofilePhoto(file);
        }
    };
    const uploadFile = () => {
        document.getElementById("imgfile").click();
    };

    const disable =
        user?.bio === bio && user?.gender === gender && profilePhoto === "";

    const editProfileHandler = async () => {
        const formData = new FormData();
        formData.append("bio", bio);
        formData.append("loginUser", user?._id);
        formData.append("profilePhoto", profilePhoto);
        formData.append("gender", gender);
        try {
            setloading(true);
            const res = await axios.post(
                `https://instagram-3-u1yc.onrender.com/profile/edit`,
                formData
            );
            if (res.status == 200) {
                const updatedUserData = {
                    ...user,
                    bio: res.data.user?.bio,
                    profilePhoto: res.data.user?.profilePhoto,
                    gender: res.data.user.gender,
                };
                dispatch(getUser(updatedUserData));
                navigate(`/profile/${user?._id}`);
                toast.success(res?.data?.message);
                setprofilePhoto("");
            }
        } catch (error) {
            console.log(error);
        } finally {
            setloading(false);
        }
    };
    return (
        <>
            <div className="flex flex-col w-full h-full pl-[280px] pr-[180px] pt-[30px] gap-[30px]">
                <span className="text-[25px] font-bold">Edit profile</span>
                <div className="flex items-center justify-between p-4 rounded-xl bg-gray-200">
                    <div className="flex items-center">
                        <div className="flex items-center justify-center w-12 h-12 overflow-hidden rounded-full">
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
                        <div className="flex flex-col ml-2 mt-[6px]">
                            <span className="font-bold leading-3">
                                {user?.username}
                            </span>
                            <span className="text-gray-500 ">{user?.name}</span>
                        </div>
                    </div>
                    <div className="flex items-center">
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
                </div>
                <div className="flex flex-col">
                    <span className="font-bold text-[18px] mb-3">Bio</span>
                    <input
                        type="text"
                        value={bio}
                        onChange={(e) => {
                            setbio(e.target.value);
                        }}
                        className="w-full bg-gray-200 outline-none rounded-lg p-3"
                    />
                </div>
                <div className="flex flex-col">
                    <span className="font-bold text-[18px] mb-3">Gender</span>
                    <select
                        defaultValue={gender}
                        onChange={(e) => {
                            setgender(e.target.value);
                        }}
                        className="bg-gray-200 outline-none cursor-pointer p-2 rounded-lg"
                    >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>

                <div className="flex w-full justify-end">
                    {disable ? (
                        <button
                            disabled
                            className="bg-blue-600 px-8 btn text-white p-2 rounded-lg font-semibold hover:bg-blue-700 mt-8"
                        >
                            Submit
                        </button>
                    ) : (
                        <button
                            onClick={editProfileHandler}
                            className="bg-blue-600 btn px-8 text-white p-2 rounded-lg font-semibold hover:bg-blue-700 mt-8"
                        >
                            {loading ? (
                                <span className="loading loading-spinner loading-md"></span>
                            ) : (
                                "Submit"
                            )}
                        </button>
                    )}
                </div>
            </div>
        </>
    );
};

export default EditProfile;
