import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
        suggestedUser: [],
        profile: null,
        onlineUsers: null,
    },
    reducers: {
        getUser: (state, action) => {
            state.user = action.payload;
        },
        bookmarkUpdate: (state, action) => {
            if (state.user.bookmarks.includes(action.payload)) {
                state.user.bookmarks = state.user.bookmarks.filter((id) => {
                    return id !== action.payload;
                });
            } else {
                state.user.bookmarks.push(action.payload);
            }
        },
        getSuggestedUser: (state, action) => {
            state.suggestedUser = action.payload;
        },
        getMyProfile: (state, action) => {
            state.profile = action.payload;
        },
        followingUpdate: (state, action) => {
            if (state.user.following.includes(action.payload)) {
                state.user.following = state.user.following.filter((itemId) => {
                    return itemId !== action.payload;
                });
            } else {
                state.user.following.push(action.payload);
            }
        },
        setOnlineUsers: (state, action) => {
            state.onlineUsers = action.payload;
        },
    },
});

export const {
    getUser,
    bookmarkUpdate,
    getSuggestedUser,
    getMyProfile,
    followingUpdate,
    setOnlineUsers,
} = userSlice.actions;
export default userSlice.reducer;
