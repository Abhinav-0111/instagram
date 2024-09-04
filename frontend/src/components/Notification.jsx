import React from "react";
import { useSelector } from "react-redux";

const Notification = () => {
    const { likeNotification } = useSelector(
        (state) => state.realTimeNotification
    );

    return (
        <>
            <div className="flex flex-col w-full h-screen overflow-hidden px-[100px] pt-[25px]">
                <div className="flex w-full h-full overflow-y-auto flex-col">
                    <span className="font-bold text-[30px] mb-9">
                        Notifications
                    </span>
                    {likeNotification?.length === 0 ? (
                        <p>No new notification</p>
                    ) : (
                        likeNotification?.map((item) => {
                            return (
                                <>
                                    <div
                                        key={item?.userId}
                                        className="flex items-center cursor-pointer hover:bg-gray-100 p-3 rounded-md"
                                    >
                                        <div className="flex items-center justify-center overflow-hidden h-9 w-9 rounded-full">
                                            <img
                                                src={
                                                    item?.userDetails
                                                        ?.profilePhoto ||
                                                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdO2DCDcfM7yDAtEo797CkSw_njibgz-lOgw&s"
                                                }
                                                alt="logo"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <p className="text-[17px] font-semibold ml-2">
                                            {item?.userDetails?.username}
                                            <span className="text-[17px] font-normal ml-2">
                                                liked your post
                                            </span>
                                        </p>
                                    </div>
                                </>
                            );
                        })
                    )}
                </div>
            </div>
        </>
    );
};

export default Notification;
