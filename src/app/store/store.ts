'use client'
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import {
    persistReducer,
    persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
} from 'redux-persist';
import { setupListeners } from "@reduxjs/toolkit/dist/query";

import userReducer from './features/user/user';
import postsReducer from './features/posts/post';
import authReducer from './features/auth/auth';
import searchTitleReducer from './features/search/searchByTitle';
import uploadReducer from './features/upload/upload'

const LS_TOKEN_AUTH = 'tuk' //token user key

const persistConfig = {
    key: LS_TOKEN_AUTH,
    storage,
}
const rootReducer = combineReducers({
    auth: authReducer,
})
export const persistedReducer = persistReducer(persistConfig, rootReducer)


export const store = configureStore({
    reducer: {
        auth: authReducer,
        users: userReducer,
        posts: postsReducer,
        searchTit: searchTitleReducer,
        upload: uploadReducer,
        persistedReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        })
});


setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);