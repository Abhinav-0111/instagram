import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
    name: "posts",
    initialState: {
        posts: [],
        refresh: false,
        selectedPost: null,
    },
    reducers: {
        setPosts: (state, action) => {
            state.posts = action.payload;
        },
        setRefresh: (state) => {
            state.refresh = !state.refresh;
        },
        setSelectedPost: (state, action) => {
            state.selectedPost = action.payload;
        },
        // updateSelectedComment: (state, action) => {
        //     if (state.selectedPost.comments.includes(action.payload)) {
        //         state.selectedPost.comments =
        //             state.selectedPost.comments.filter((id) => {
        //                 return id !== action.payload;
        //             });
        //     } else {
        //         state.selectedPost.comments.push(action.payload);
        //     }
        // },
    },
});

export const { setPosts, setRefresh, setSelectedPost } = postSlice.actions;
export default postSlice.reducer;
