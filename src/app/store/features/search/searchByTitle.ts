import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "@/app/axios";

interface IItem {
    id: number;
    title: string;
    content: string;
    date_change: string;
    user_id: number;
    tags: string[];
    nick: string;
}

interface IResult {
    result: IItem[],
    status: "init" | "loading" | "error" | "success";
}


const initialState: IResult = {
    result: [{
      id: 0,
      title: '',
      content: '',
      date_change: '',
      user_id: 0,
      tags: [""],
      nick: ""
    }],
    status: 'init'
}

export const searchTitleSlice = createSlice({
    name: "searchTitle",
    initialState,
    reducers: {

    },
    extraReducers: builder => {
        builder
            .addCase(searchByTitle.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(searchByTitle.fulfilled, (state, action) => {
                state.status = 'success'
                state.result = action.payload.postList
            })
            .addCase(searchByTitle.rejected, (state)  => {
                state.status = 'error'
            })
    }
})

export const searchByTitle = createAsyncThunk('posts/searchByTitle', async(title: string) => {
    const { data } = await axios.get(`post/by_title?title=${title}`);
    return data;
})

export const searchTitleAction = searchTitleSlice.actions;

export default searchTitleSlice.reducer