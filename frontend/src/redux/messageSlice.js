import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
    name: "message",
    initialState: {
        followingUser: [],
        selectedUser: null,
        messages: null,
    },
    reducers: {
        getFollowingUser: (state, action) => {
            state.followingUser = action.payload;
        },
        getSelectedUser: (state, action) => {
            state.selectedUser = action.payload;
        },
        setMessages: (state, action) => {
            state.messages = action.payload;
        },
    },
});

export const { getFollowingUser, getSelectedUser, setMessages } =
    messageSlice.actions;
export default messageSlice.reducer;
