import { createSlice, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import axios from "@/app/axios";

interface IFile {
    photo: string;
    recentlyPh: string[];
    status: "init" | "loading" | "error" | "success";
}

const initialState: IFile = {
    photo: '/question.svg',
    recentlyPh: ['/question.svg'],
    status: 'init'
}

export const uploadSlice = createSlice({
    name: 'upload',
    initialState,
    reducers: {

    },
    extraReducers: builder => {
        builder
            .addCase(uploadFile.pending, state => {
                state.status = 'loading'
            })
            .addCase(uploadFile.fulfilled, (state, action) => {
                state.status = 'success'
                state.photo = action.payload
            })
            .addCase(uploadFile.rejected, state => {
                state.status = 'error'
            })
            .addCase(getPhoto.pending, state => {
                state.status = 'loading'
            })
            .addCase(getPhoto.fulfilled, (state, action) => {
                state.status = 'success'
                state.photo = action.payload.current_photo
                state.recentlyPh = action.payload.photo_names
            })
            .addCase(getPhoto.rejected, state => {
                state.status = 'error'
            })
    }
})

export const getPhoto = createAsyncThunk('getPhoto', async (
    value: {
        id: number
    }
) => {
    const { data } = await axios.get(`upload?user_id=${value.id}`);
    return data;
})

export const uploadFile = createAsyncThunk('uploadFile', async(
    value: {
        id: number,
        file: any
    }
) => {
    const { data } = await axios.put(`upload/photo?user=${value.id}`, value.file)
    return data;
})

export const deleteFile = createAsyncThunk('uploadFile', async(
    file
) => {
    const { data } = await axios.delete(`user/photo?file=${file}`)
    return data;
})

export const uploadAction = uploadSlice.actions;
export default uploadSlice.reducer