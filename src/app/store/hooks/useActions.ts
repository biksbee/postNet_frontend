import { useDispatch } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import { useMemo } from "react";

import { userAction } from "../features/user/user";
import { postsAction } from "@/app/store/features/posts/post";

const rootActions = {
    ...userAction,
    ...postsAction,
}

export const useActions = () => {
    const dispatch = useDispatch();
    return useMemo(() =>
        bindActionCreators(rootActions, dispatch), [dispatch]
    )
}