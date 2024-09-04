import React, { useContext } from "react";
import LeftSidebar from "./LeftSidebar";
import { Outlet } from "react-router-dom";
import ContextApi from "../context/ContextApi";
import useGetAllPost from "../hooks/useGetAllPosts";
import useGetSuggestedUsers from "../hooks/useGetSuggestedUsers";

const Home = () => {
    const { categories } = useContext(ContextApi);
    useGetAllPost();
    useGetSuggestedUsers();
    return (
        <>
            <div className={`${categories === "Messages" ? "home2" : "home"}`}>
                <LeftSidebar />
                <Outlet />
            </div>
        </>
    );
};

export default Home;
