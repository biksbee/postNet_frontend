import {createSlice, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import axios from "@/app/axios";

interface IPostItem {
    id: number
    title: string;
    content: string;
    date_change: string;
    tags: string[];
    user_id: number;
    nick: string;
    email: string;
    isfavorite: boolean;
}

interface IPostCreateItem {
    id: number;
    title: string;
    content: string;
    date_change: string;
    tags: string[];
    user_id: number;
}
interface IPost {
    item: IPostCreateItem;
    items: {
        post: IPostItem[],
        nick: string,
        email: string
    };
    postById: IPostById;
    quan: number;
    post_id: number;
    status: "init" | "loading" | "error" | "success";
}

interface IPostById {
    post: IPostCreateItem;
    nick: string;
    email: string;
    status: "init" | "loading" | "error" | "success";
}

const initialState: IPost = {
    item: {
        id: 0,
        title: "",
        content: "",
        date_change: "",
        tags: [],
        user_id: 0
    },
    items: {
        post: [{
            id: 0,
            title: '',
            content: '',
            date_change: '',
            tags: [],
            user_id: 0,
            nick: '',
            email: '',
            isfavorite: false,
        }],
        nick: '',
        email: ''
    },
    postById: {
        post: {
            id: 0,
            title: "",
            content: "",
            date_change: "",
            tags: [],
            user_id: 0
        },
        nick: "",
        email: "",
        status: "init"
    },
    quan: 1,
    post_id: 0,
    status: 'init'
}



export const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        addPostEmpty: (state) => {
            state.item.title = ''
            state.item.content = ''
            state.item.tags =  []
        },
        addTags: (state) => {
            state.item.tags.push("")
        },
        writeTag: (state, action: PayloadAction<{ writeTags: string; index: number;}>) => {
            state.item.tags[action.payload.index] = action.payload.writeTags
        },
        deleteTag: (state, action: PayloadAction<number>) => {
            state.item.tags= state.item.tags.filter((el, index) => index !== action.payload)
        },
        updateStatus: (state) => {
            state.status = 'init'
        },
        addToFavorite: (state, action: PayloadAction<number>) => {
            const indexPost = state.items.post.findIndex(item => item.id === action.payload)
            state.items.post[indexPost].isfavorite = true
        },
        deleteFromFavorite: (state, action: PayloadAction<number>) => {
            const indexPost = state.items.post.findIndex(item => item.id === action.payload)
            state.items.post[indexPost].isfavorite = false
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = 'success'
                state.items.post = action.payload.postsS
                state.quan = action.payload.quan
            })
            .addCase(fetchPosts.rejected, (state) => {
                state.status = "error"
            })
            .addCase(ownPosts.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(ownPosts.fulfilled, (state, action) => {
                state.status = 'success'
                state.items.post = action.payload.postsS
                state.items.nick = action.payload.nick
                state.quan = action.payload.quan
            })
            .addCase(ownPosts.rejected, (state) => {
                state.status = "error"
            })
            .addCase(addPost.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(addPost.fulfilled, (state, action) => {
                state.status = 'success'
                state.item = action.payload
            })
            .addCase(addPost.rejected, (state) => {
                state.status = "error"
            })
            .addCase(updatePost.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(updatePost.fulfilled, (state, action) => {
                state.status = 'success'
                state.item = action.payload
            })
            .addCase(updatePost.rejected, (state) => {
                state.status = "error"
            })
            .addCase(getPostById.pending, (state) => {
                state.postById.status = 'loading'
            })
            .addCase(getPostById.fulfilled, (state, action) => {
                state.postById.status = 'success'
                state.postById = action.payload
            })
            .addCase(getPostById.rejected, (state) => {
                state.postById.status = "error"
            })
            .addCase(favoritePosts.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(favoritePosts.fulfilled, (state, action) => {
                state.status = 'success'
                state.items.post = action.payload
                state.quan = action.payload.quan
            })
            .addCase(favoritePosts.rejected, (state) => {
                state.status = "error"
            })
            .addCase(addFavoritePost.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(addFavoritePost.fulfilled, (state, action) => {
                state.status = 'success'
                state.items.post = state.items.post.filter(post => post.id !== action.payload.post_id)
            })
            .addCase(addFavoritePost.rejected, (state) => {
                state.status = "error"
            })
            .addCase(removeFavoritePost.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(removeFavoritePost.fulfilled, (state, action) => {
                state.status = 'success'
            })
            .addCase(removeFavoritePost.rejected, (state) => {
                state.status = "error"
            })

    }
})

// all page
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async(
    value: {
        counter: number;
        page: number;
    }
) => {
    const { data } = await axios.post('/post/all', value);
    return data;
})
// own page
export const ownPosts = createAsyncThunk('posts/ownPosts', async(
    value: {
        counter: number,
        page: number,
        nick: string
    }
) => {
    const { data } = await axios.post('post/by_user', value);
    return data;
})

// favorite page
export const favoritePosts = createAsyncThunk('posts/favoritePosts', async(
    value: {
        user: number,
        page: number
    }
) => {
    const { data } = await axios.get(`/post/getFavorite?user=${value.user}&page=${value.page}`);
    return data;
})

export const addFavoritePost = createAsyncThunk('post/addFavoritePost', async(
    value: {
        user_id: number;
        post_id: number;
    }
) => {
    const { data } = await axios.get(`/post/favorite?user=${value.user_id}&post=${value.post_id}`)
    return data;
})

export const removeFavoritePost = createAsyncThunk('post/removeFavoritePost', async(
    value: {
        user_id: number;
        post_id: number;
    }
) => {
    const { data } = await axios.delete(`/post/favorite?user=${value.user_id}&post=${value.post_id}`)
    return data;
})

export const addPost = createAsyncThunk('posts/addPost', async(
    value: {
        title: string;
        content: string;
        tags: string[];
    }
) => {
    const { data } = await axios.post('post', value)
    return data;
})

export const updatePost = createAsyncThunk('post/updatePost', async(
    value: {
        id: number;
        title: string;
        content: string;
        tags: string[]
    }
) => {
    const { data } = await axios.put('post', value)
    return data;
})

export const getPostById = createAsyncThunk('post/getPostById', async(
    value: {
        post_id: number;
        nick: string;
    }
) => {
    const { data } = await axios.get(`post?post_id=${value.post_id}&nick=${value.nick}`);
    return data;
})

export const deletePost = createAsyncThunk('posts/deletePost', async(
        id: number
) => {
    const { data } = await axios.delete(`post?id=${id}`)
    return data;
})


export const postsAction = postsSlice.actions;

export default postsSlice.reducer;