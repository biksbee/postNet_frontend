import {createSlice, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import axios from "@/app/axios";

interface IAuthValue {
    id: number;
    name: string;
    nick: string;
    email: string;
    token: string;
    avatarurl: string;
}

interface IAuth {
    user: IAuthValue;
    status: "init" | "loading" | "error" | "success";
}

const initialState: IAuth = {
    user: {
        id: 0,
        name: "",
        nick: "",
        email: "",
        token: "",
        avatarurl: ""

    },
    status: 'init'
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = {}
                // persistor.purge().then(() => {console.log("!!!!!!2523!!!!!")})
            state.status = 'init'
        },
    },
    extraReducers: builder => {
        builder
            .addCase(authByNickPas.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(authByNickPas.fulfilled, (state, action) => {
                state.status = 'success'
                state.user = action.payload
            })
            .addCase(authByNickPas.rejected, (state) => {
                state.status = "error"
            })
            .addCase(createUser.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.status = 'success'
                state.user = action.payload
            })
            .addCase(createUser.rejected, (state) => {
                state.status = 'error'
            })
    }
})

export const authByNickPas = createAsyncThunk('user/authByNickPas', async(
    value: {
        nick: string,
        password: string,
    }
) => {
    const { data } = await axios.post('/user/login', value)
    return data
})

export const createUser = createAsyncThunk('user/createUser', async(
    value: {
        name: string,
        nick: string,
        email: string,
        password: string
    }
) => {
    const { data } = await axios.post('/user', {...value, avatarUrl: ""})
    return data;
})

export const deleteUserById = createAsyncThunk('user/deleteUsr', async(
    id: number
) => {
    await axios.delete(`/user?id=${id}`);
    return true
})

export const authAction = authSlice.actions;
export default authSlice.reducer;