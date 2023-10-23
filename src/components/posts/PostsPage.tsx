'use client'
import {FC, useEffect, useState} from 'react';
import { useAppSelector, useAppDispatch, useActions } from "@/app/store/hooks/useActions";
import {fetchPosts, ownPosts, favoritePosts} from "@/app/store/features/posts/post";
import { useRouter } from 'next/navigation';

import { Loading } from "@/components/loading/Loading";
import { PostButton } from "@/components/posts/postButton/postButton";
import { PostList } from "@/components/posts/postslist/PostList";
import { CreatePostPage } from "@/components/posts/createPostPage/CreatePostPage";
import { Search } from "@/components/search/Search";
import api from "@/app/axios";

interface IPostPage {
    counter?: number
}

export const PostsPage:FC<IPostPage> = ({counter = 5}) => {

    const router = useRouter()

    const status = useAppSelector(state => state.posts.status)
    const user_id = useAppSelector(state => state.persistedReducer.auth.user.id)
    const items = useAppSelector(state => state.posts.items.post)
    const quan = useAppSelector(state => state.posts.quan)
    const nick = useAppSelector(state => state.persistedReducer.auth.user.nick)
    const idAuth = useAppSelector(state => state.persistedReducer.auth.user.id)
    const token = useAppSelector(state => state.persistedReducer.auth.user.token)
    const [page, setPage] = useState<number>(1)
    const [typePage, setTypePage] = useState<"add Post" | "show all" | "show my post" | "show favorite">("show all")

    const { addPostEmpty, updateStatus } = useActions()

    const [quanCurrent, setQuanCurrent] = useState<number>(quan)

    const dispatch = useAppDispatch();
    useEffect(() => {
        if(typePage === "show my post"){
            dispatch(ownPosts({counter, page, nick}))
            setQuanCurrent(quan)
        } else if(typePage === "show all"){
            if(typeof window !== "undefined"){
                api.interceptors.request.use((config) => {
                    config.headers.auth_user_id = user_id;
                    return config
                })
            }
            dispatch(fetchPosts({counter, page}))
        } else if(typePage === "show favorite"){
            dispatch(favoritePosts({user: idAuth, page}))
        }
    }, [quanCurrent, page, typePage]);

    const render = () => {
        if (status === "init" || status === "loading") {
            return <Loading />;
        }
        if(status === "error"){
            return "Error happened";
        }
    };

    const checkAuth = () => token !== undefined;

    const addPost = () => {
        if(checkAuth()){
            addPostEmpty()
            setTypePage("add Post")
        } else router.push('/auth')
    }

    const showAll = () => {
        setTypePage("show all")
        setPage(1)
    }

    const showMyPost = () => {
        if(checkAuth()){
            setTypePage("show my post")
            setPage(1)
        } else router.push('/auth')
    }

    const showFavoritePost = async() => {
        if(checkAuth()){
            setTypePage("show favorite")
            setPage(1)
        } else router.push('/auth')

    }

    return(
        <div>
            {render()}
            {counter === 5 &&
                <div className={"flex gap-x-[12px]"}>
                    <PostButton
                        text={"Posts"}
                        handler={showAll}
                        type={"show all"}
                        typePage={typePage}
                    />
                    {
                        typePage === "show my post" ?
                            <PostButton
                                text={"add Post"}
                                handler={addPost}
                                type={"add Post"}
                            />
                            :
                            typePage === "add Post" ?
                                <PostButton
                                    text={"Cansel"}
                                    handler={showMyPost}
                                />
                                :
                        <PostButton
                            text={"My post"}
                            handler={showMyPost}
                            type={"show my post"}
                            typePage={typePage}
                        />
                    }
                    <PostButton
                        text={"Favorite"}
                        handler={showFavoritePost}
                        type={"show favorite"}
                        typePage={typePage}
                    />
                </div>
            }
            {
                counter === 5 && quan > 5 && typePage !== "add Post" &&
                <Search />
            }
            {
                typePage === "add Post" &&
                <CreatePostPage
                    setTypePage={setTypePage}
                    nickAuth={nick}
                />
            }
            <PostList
                items={items}
                counter={counter}
                setPage={setPage}
                quan={quan}
                quanCurrent={quanCurrent}
                setQuanCurrent={setQuanCurrent}
                setTypePage={setTypePage}
                typePage={typePage}
            />
        </div>
    )
}

