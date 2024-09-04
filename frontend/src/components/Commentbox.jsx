import React, { useEffect, useRef } from "react";

const Commentbox = ({ item }) => {
    const scroll = useRef();
    useEffect(() => {
        scroll.current?.scrollIntoView({ behavior: "smooth" });
    }, [item]);
    return (
        <>
            <div
                ref={scroll}
                className="hh flex items-center mb-5 pt"
            >
                <div className="flex overflow-hidden items-center justify-center h-9 w-9 rounded-full">
                    <img
                        src={
                            item?.author?.profilePhoto
                                ? item?.author?.profilePhoto
                                : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdO2DCDcfM7yDAtEo797CkSw_njibgz-lOgw&s"
                        }
                        alt="logo"
                        className="h-full w-full object-cover"
                    />
                </div>
                <h1 className="font-semibold ml-2">
                    {item?.author?.name}
                    <span className="font-normal pl-1">{item?.text}</span>
                </h1>
            </div>
        </>
    );
};

export default Commentbox;
