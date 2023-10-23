import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "@/app/axios";


interface IUserOne {
    id: number;
    name: string;
    nick: string;
    email: string;
    password: string;
    avatarurl?: string;
    token: string;

}

interface UsersI {
    users: IUserOne[];
    status: "init" | "loading" | "error" | "success";
}

const initialState: UsersI = {
    users: [],
    status: 'init'
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {

    },
    extraReducers: builder => {
        builder
            .addCase(fetchUsers.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.status = 'success'
                state.users = action.payload
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.status = 'error'
            })
    }
})

export const fetchUsers = createAsyncThunk('user/fetchUsers', async() => {
    const { data } = await axios.get('/user/all');
    return data;
})




export const userAction = userSlice.actions;

export default userSlice.reducer;