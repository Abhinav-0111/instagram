import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ProfileDetails = ({ followAndUnfollowing }) => {
    const { profile, user } = useSelector((state) => state.user);
    const isFollow = false;
    return (
        <>
            <div className="flex items-center pl-[68px]">
                <div className="flex items-center justify-center h-[150px] w-[150px] overflow-hidden rounded-full mt-2">
                    <img
                        src={
                            profile?.profilePhoto
                                ? profile?.profilePhoto
                                : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdO2DCDcfM7yDAtEo797CkSw_njibgz-lOgw&s"
                        }
                        alt="pic"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="flex flex-col ml-[90px]">
                    <div className="flex items-center">
                        <span className=" text-[20px] mr-4">
                            {profile?.username}
                        </span>
                        {profile?._id === user?._id ? (
                            <>
                                <Link to={"/profileEdit"}>
                                    <button className="bg-[#F2F2F2] hover:bg-[#DBDBDB] text-[15px] py-1 px-3 rounded-lg font-semibold mr-4">
                                        Edit profile
                                    </button>
                                </Link>
                                <button className="bg-[#F2F2F2] hover:bg-[#DBDBDB]  py-1 px-3 rounded-lg font-semibold text-[15px]">
                                    View archive
                                </button>
                            </>
                        ) : (
                            <>
                                {user?.following?.includes(profile?._id) ? (
                                    <>
                                        <button
                                            onClick={followAndUnfollowing}
                                            className="bg-[#F2F2F2] hover:bg-[#DBDBDB] text-[15px] py-1 px-3 rounded-lg font-semibold mr-4"
                                        >
                                            Following...
                                        </button>
                                        <button className="bg-[#F2F2F2] hover:bg-[#DBDBDB] text-[15px] py-1 px-3 rounded-lg font-semibold mr-4">
                                            Message
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            onClick={followAndUnfollowing}
                                            className="bg-blue-500 text-white hover:bg-blue-600 text-[15px] py-1 px-3 rounded-lg font-semibold mr-4"
                                        >
                                            Follow
                                        </button>
                                        <button className="bg-[#F2F2F2] hover:bg-[#DBDBDB] text-[15px] py-1 px-3 rounded-lg font-semibold mr-4">
                                            Message
                                        </button>
                                    </>
                                )}
                            </>
                        )}
                    </div>
                    <div className="flex items-center mt-5 gap-9">
                        <p className="font-semibold">
                            {profile?.posts.length}&nbsp;
                            <span className="font-normal">
                                {profile?.posts.length <= 1 ? "post" : "posts"}
                            </span>
                        </p>
                        <p className="font-semibold cursor-pointer">
                            {profile?.followers.length}&nbsp;
                            <span className="font-normal">followers</span>
                        </p>
                        <p className="font-semibold cursor-pointer">
                            {profile?.following.length}&nbsp;
                            <span className="font-normal">following</span>
                        </p>
                    </div>
                    <span className="mt-3 font-semibold text-[15px]">
                        {profile?.name}
                    </span>
                    <span className="text-[15px] text-gray-400 leading-[16px]">
                        {profile?.username}
                    </span>
                    <p className="mt-2 text-[15px] w-[350px]">
                        {profile?.bio ||
                            "Do not give up. The beginning is always the hardest.📚CS"}
                    </p>
                </div>
            </div>
        </>
    );
};

export default ProfileDetails;
