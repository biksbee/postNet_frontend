import { bindActionCreators } from "@reduxjs/toolkit";
import { useMemo } from "react";
import { TypedUseSelectorHook, useSelector, useDispatch} from "react-redux";
import {AppDispatch, RootState} from "@/app/store/store";

import { userAction } from "../features/user/user";
import { postsAction } from "@/app/store/features/posts/post";
import { authAction} from "@/app/store/features/auth/auth";
import { searchTitleAction } from "@/app/store/features/search/searchByTitle";
import { uploadAction } from "@/app/store/features/upload/upload";

const rootActions = {
    ...userAction,
    ...authAction,
    ...postsAction,
    ...searchTitleAction,
    ...uploadAction,
}

export const useAppDispatch = useDispatch<AppDispatch>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useActions = () => {
    const dispatch = useAppDispatch();
    return useMemo(() =>
        bindActionCreators(rootActions, dispatch), [dispatch]
    )
}