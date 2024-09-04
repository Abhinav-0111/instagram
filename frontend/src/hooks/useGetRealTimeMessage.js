import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../redux/messageSlice";

const useGetRealTimeMessage = () => {
    const { socket } = useSelector((state) => state.socket);
    const { refresh } = useSelector((state) => state.posts);
    const { messages } = useSelector((state) => state.message);
    const dispatch = useDispatch();
    useEffect(() => {
        socket?.on("newMessage", (newMessage) => {
            dispatch(setMessages([...messages, newMessage]));
        });
        return () => {
            socket?.off("newMessage");
        };
    }, [socket, messages, refresh, setMessages]);
};

export default useGetRealTimeMessage;
