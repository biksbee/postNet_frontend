import {FC, useEffect, useState} from "react";
import { useRouter } from 'next/navigation';
import cn from 'classnames';
import Image from "next/image";

import { SmallButton } from "@/components/button/iconButton/smallButton";
import {useActions, useAppDispatch, useAppSelector} from "@/app/store/hooks/useActions";
import { deletePost, addFavoritePost, removeFavoritePost, getPostById } from "@/app/store/features/posts/post";

import { CreatePostPage } from "@/components/posts/createPostPage/CreatePostPage";

interface IItem {
    id: number;
    title: string;
    content: string;
    date_change: string;
    tags: string[];
    nick: string;
    quanCurrent: number;
    setQuanCurrent: (quanCurrent: number) => void;
    authNick: string;
    setTypePage: (typePage: "add Post" | "show all" | "show my post" | "show favorite") => void;
    typePage: "add Post" | "show all" | "show my post" | "show favorite";
    isfavorite: boolean;
}

export const Item:FC<IItem> = ({
    id,
    title,
    content,
    date_change,
    tags,
    nick,
    quanCurrent,
    setQuanCurrent,
    authNick,
    setTypePage,
    typePage,
    isfavorite,
}) => {

    const dispatch = useAppDispatch()
    const router = useRouter()
    const nickAuth = useAppSelector(state => state.persistedReducer.auth.user.nick)
    const idAuth = useAppSelector(state => state.persistedReducer.auth.user.id)

    const status = useAppSelector(state => state.posts.status)

    const { deleteFromFavorite, addToFavorite } = useActions()
    const [disabled, setDisabled] = useState<boolean>(false)
    const [edit, setEdit] = useState<boolean>(false)

    const updatePostFunc = async() => {
        setEdit(true)
    }
    const addFavorite = async() => {
        addToFavorite(id)
        await dispatch(addFavoritePost({user_id: idAuth, post_id: id}))
    }
    const removeFavorite = async() => {
        deleteFromFavorite(id)
        await dispatch(removeFavoritePost({user_id: idAuth, post_id: id}))
    }
    const deleteCurrentPost = async() => {
        await dispatch(deletePost(id))
        setQuanCurrent(quanCurrent-1)
    }

    const openFull = () => {
        dispatch(getPostById({post_id: id, nick: nickAuth}))
        router.push(`/post_full?post_id=${id}`)
    }

    return(
        <div className={""}>
            <div className={"flex flex-col justify-between text-white xl:w-[800px] md:w-[500px] w-[80vw] h-[200px] rounded-[16px] bg-black bg-opacity-90 p-[8px]"}>
                <div>
                    <div className={"flex w-full justify-between text-[18px] font-bold mb-[20px]"}>
                        <div className={"w-full flex justify-center"}>
                            {title}
                        </div>
                            <div className={"flex gap-x-[5px]"}>
                                {
                                    (typePage === "show my post") &&
                                    <SmallButton
                                        text={"U"}
                                        handler={updatePostFunc}
                                        disabled={disabled}
                                        type={"update"}
                                    />
                                }
                                {
                                    authNick !== nick &&
                                    (
                                        !isfavorite ?
                                            <SmallButton
                                                text={"F"}
                                                handler={addFavorite}
                                                disabled={disabled}
                                                type={"favorite"}
                                            />
                                            :
                                            <div
                                                className={"w-max h-max"}
                                                onClick={removeFavorite}
                                            >
                                                <Image
                                                    src={"/star.svg"}
                                                    alt={"f"}
                                                    width={16}
                                                    height={16}
                                                />
                                            </div>
                                    )
                                }
                                {
                                    (typePage === "show my post") &&
                                    <SmallButton
                                        text={"X"}
                                        handler={deleteCurrentPost}
                                        disabled={disabled}
                                        type={"delete"}
                                    />
                                }
                            </div>
                    </div>
                    <div className={"flex text-[16px]"}>
                        {content}
                    </div>
                </div>
                <div className={"flex flex-col gap-y-[6px]"}>
                    <div
                        onClick={openFull}
                        className={"flex justify-end pr-[5px] underline text-white hover:text-[rgba(255,255,255,.6)] cursor-pointer"}
                    >
                        more
                    </div>
                    <div
                        className={cn(
                            "w-full flex text-[14px]",
                            authNick !== nick ? "justify-between" : "justify-end"
                        )}
                    >
                        {
                            authNick !== nick &&
                            <div>{nick}</div>
                        }
                        {date_change}
                    </div>
                </div>
            </div>
            <div className={"flex gap-x-[8px] pl-[8px] italic"}>
                {
                    (tags).map((item, index) => (
                        <div key={index} className={"text-[14px] text-white"}>
                            #{item}
                        </div>
                    ))
                }
            </div>
            {
                edit &&
                <div className={"mt-[50px]"}>
                    <CreatePostPage
                        setTypePage={setTypePage}
                        edit={edit}
                        setEdit={setEdit}
                        id={id}
                        titleCurrent={title}
                        contentCurrent={content}
                        nickAuth={nickAuth}
                    />
                </div>
            }
        </div>

    )
}