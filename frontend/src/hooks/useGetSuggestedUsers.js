import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSuggestedUser } from "../redux/userSlice";

const useGetSuggestedUsers = () => {
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const fetchSuggestedUser = async () => {
        try {
            const res = await axios.get(
                `${window.location.origin}/otheruser/${user?._id}`
            );
            if (res.status === 200) {
                dispatch(getSuggestedUser(res?.data?.otherUser));
            }
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        fetchSuggestedUser();
    }, []);
};

export default useGetSuggestedUsers;
