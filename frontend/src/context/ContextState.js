import React, { useState } from "react";
import ContextApi from "./ContextApi";
import { useSelector } from "react-redux";

const ContextState = (props) => {
    const [categories, setcategories] = useState("Home");
    const [postdialog, setpostdialog] = useState(false);
    const [open, setopen] = useState(false);
    const [open2, setopen2] = useState(false);
    const [digloue, setdigloue] = useState(false);
    const [activeSelectedUser, setactiveSelectedUser] = useState(null);

    const handleCategories = (item) => {
        if (item === "Logout") {
            return false;
        } else if (item === "Create") {
            return false;
        } else {
            setcategories(item);
        }
    };

    const handleSelectedUser = (item) => {
        setactiveSelectedUser(item);
    };

    const readFileAsDataURL = (file) => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (typeof reader.result === "string") resolve(reader.result);
            };
            reader.readAsDataURL(file);
        });
    };
    return (
        <>
            <ContextApi.Provider
                value={{
                    categories,
                    readFileAsDataURL,
                    setcategories,
                    open,
                    setopen,
                    handleCategories,
                    open2,
                    setopen2,
                    digloue,
                    setdigloue,
                    postdialog,
                    setpostdialog,
                    activeSelectedUser,
                    setactiveSelectedUser,
                    handleSelectedUser,
                }}
            >
                {props.children}
            </ContextApi.Provider>
        </>
    );
};

export default ContextState;
