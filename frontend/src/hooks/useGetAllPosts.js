import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../redux/postSlice";
import { toast } from "react-toastify";

// const useGetAllPost = () => {
//     const dispatch = useDispatch();
//     const { refresh } = useSelector((state) => state.posts);
//     const fetchAllPosts = async () => {
//         try {
//             const res = await axios.get(`http://localhost:8000/all`);
//             if (res?.status === 200) {
//                 dispatch(setPosts(res?.data?.posts));
//             }
//         } catch (error) {
//             toast.error(error?.response?.data?.error);
//         }
//     };
//     useEffect(() => {
//         fetchAllPosts();
//     }, [refresh]);
// };
const useGetAllPost = () => {
    const dispatch = useDispatch();
    const { refresh } = useSelector((state) => state.posts);
    const { user } = useSelector((state) => state.user);
    const fetchAllPosts = async () => {
        try {
            const res = await axios.get(
                `${window.location.origin}/getallpost/${user?._id}`
            );
            if (res?.status === 200) {
                dispatch(setPosts(res?.data?.message));
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.error);
        }
    };
    useEffect(() => {
        fetchAllPosts();
    }, [refresh]);
};
export default useGetAllPost;
