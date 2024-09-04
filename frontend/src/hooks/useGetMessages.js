import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../redux/messageSlice";
import { useEffect } from "react";

const useGetMessages = () => {
    const { selectedUser } = useSelector((state) => state.message);
    const { refresh } = useSelector((state) => state.posts);
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const fetchMessages = async () => {
        if (!selectedUser) {
            return false;
        }
        try {
            const res = await axios.put(
                `http://localhost:8000/message/${selectedUser?._id}`,
                {
                    id: user?._id,
                }
            );
            dispatch(setMessages(res?.data));
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        fetchMessages();
    }, [selectedUser, refresh]);
};

export default useGetMessages;
