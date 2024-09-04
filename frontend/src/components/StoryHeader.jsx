import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

const StoryHeader = () => {
    const { suggestedUser } = useSelector((state) => state.user);
    const navigate = useNavigate();
    if (!suggestedUser) {
        return false;
    }
    return (
        <>
            <div className="flex h-full w-full overflow-hidden overflow-x-auto items-center mt-5">
                <Swiper
                    slidesPerView={3}
                    spaceBetween={-10}
                    className="mySwiper"
                >
                    {suggestedUser?.map((item) => {
                        return (
                            <>
                                <SwiperSlide>
                                    <div
                                        onClick={() => {
                                            navigate(`/profile/${item?._id}`);
                                        }}
                                        className="flex flex-col items-center"
                                    >
                                        <div className="flex h-16 w-16 overflow-hidden rounded-full items-center justify-center border-[3px] border-pink-600 cursor-pointer">
                                            <img
                                                src={
                                                    item?.profilePhoto ||
                                                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdO2DCDcfM7yDAtEo797CkSw_njibgz-lOgw&s"
                                                }
                                                alt="logo"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="flex font-sans text-[16px] ">
                                            {item?.username}
                                        </div>
                                    </div>
                                </SwiperSlide>
                            </>
                        );
                    })}
                </Swiper>
            </div>
        </>
    );
};

export default StoryHeader;
