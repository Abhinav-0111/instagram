import { useDispatch } from "react-redux";
import axios from "axios";
import { getMyProfile } from "../redux/userSlice";
import { useEffect } from "react";

const useGetMyProfile = (id) => {
    const dispatch = useDispatch();
    const getProfile = async () => {
        try {
            const res = await axios.get(`http://localhost:8000/profile/${id}`);
            dispatch(getMyProfile(res?.data?.user));
            return res;
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getProfile();
    }, [id]);
};

export default useGetMyProfile;
