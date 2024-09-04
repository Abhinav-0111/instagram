import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Home";
import Feed from "./Feed";
import Profile from "./Profile";
import SignUp from "./SignUp";
import Chat from "./Chat";
import EditProfile from "./EditProfile";
import Notification from "./Notification";
import ProtectedRoute from "./ProtectedRoute";

const Body = () => {
    const approuter = createBrowserRouter([
        {
            path: "/",
            element: (
                <ProtectedRoute>
                    <Home />,
                </ProtectedRoute>
            ),
            children: [
                {
                    path: "/",
                    element: (
                        <ProtectedRoute>
                            <Feed />
                        </ProtectedRoute>
                    ),
                },
                {
                    path: "/profile/:id",
                    element: (
                        <ProtectedRoute>
                            <Profile />
                        </ProtectedRoute>
                    ),
                },
                {
                    path: "/chat",
                    element: (
                        <ProtectedRoute>
                            <Chat />
                        </ProtectedRoute>
                    ),
                },
                {
                    path: "/profileEdit",
                    element: (
                        <ProtectedRoute>
                            <EditProfile />
                        </ProtectedRoute>
                    ),
                },
                {
                    path: "/notification",
                    element: (
                        <ProtectedRoute>
                            <Notification />
                        </ProtectedRoute>
                    ),
                },
            ],
        },
        {
            path: "/register",
            element: <SignUp />,
        },
    ]);
    return (
        <>
            <RouterProvider router={approuter} />
        </>
    );
};

export default Body;
