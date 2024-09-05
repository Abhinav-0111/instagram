import React, { useEffect } from "react";
import Body from "./components/Body";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import { setSocket } from "./redux/socketSlice";
import { setOnlineUsers } from "./redux/userSlice";
import { setLikeNotification } from "./redux/rtnSlice";

const App = () => {
    const { user } = useSelector((state) => state.user);
    const { socket } = useSelector((state) => state.socket);
    const dispatch = useDispatch();

    useEffect(() => {
        if (user) {
            const socketio = io(`${window.location.origin}`, {
                query: {
                    userId: user?._id,
                },
            });
            dispatch(setSocket(socketio));
            socketio.on("getOnlineUsers", (onlineUsers) => {
                dispatch(setOnlineUsers(onlineUsers));
            });
            socketio.on("notification", (notification) => {
                dispatch(setLikeNotification(notification));
            });

            return () => socketio.close();
        } else {
            if (socket) {
                socket.close();
                dispatch(setSocket(null));
            }
        }
    }, [user]);
    return (
        <>
            <Body />
        </>
    );
};

export default App;
