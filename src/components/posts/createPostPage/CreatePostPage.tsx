'use client'
import { FC, useEffect, useState} from "react";
import { useRouter } from 'next/navigation';
import cn from 'classnames';

import { Input } from "@/components/input/Input";
import { TextAreaInput } from "@/components/input/TextAreaInput";
import { Button } from "@/components/button/button/Button";
import { PostButton } from "@/components/posts/postButton/postButton";
import { TagsInput } from "@/components/posts/createPostPage/TagsInput";

import { useAppSelector, useAppDispatch, useActions } from "@/app/store/hooks/useActions";
import {addPost, getPostById, updatePost} from "@/app/store/features/posts/post";
import {SmallButton} from "@/components/button/iconButton/smallButton";


interface ICreatePost {
    setTypePage: (typePage: "add Post" | "show all" | "show my post" | "show favorite") => void;
    edit?: boolean;
    setEdit?: (edit: boolean) => void;
    id?: number;
    titleCurrent?: string;
    contentCurrent?: string;
    tagsCurrent?: string[];
    nickAuth: string;
}

export const CreatePostPage:FC<ICreatePost> = ({
    setTypePage ,
    edit = undefined,
    setEdit = undefined,
    id = -1,
    titleCurrent,
    contentCurrent,
    nickAuth
}) => {

    const router = useRouter()
    const tags = useAppSelector(state => state.posts.item.tags)
    const postId = useAppSelector(state => state.posts.item.id)
    const { addTags } = useActions()
    const dispatch = useAppDispatch()
    const status = useAppSelector(state => state.posts.status)

    const [disabled, setDisabled] = useState<boolean>(true)
    const [confirm, setConfirm] = useState<boolean>(false)
    const [show, setShow] = useState<boolean>(false)

    const [title, setTitle] = useState<string>(titleCurrent ?? '')
    const [content, setContent] = useState<string>(contentCurrent ?? '')

    const addTagsFunc = () => {
        addTags()
    }

    useEffect(() => {
        if(title !== "" && content !== ""){
            setDisabled(false)
        }
    }, [title, content]);

    const send = async() => {
        if(id === -1){
            await dispatch(addPost({title, content, tags}))
            while(status !== "success"){}
            dispatch(getPostById({post_id: postId, nick: nickAuth}))
        } else {
            await dispatch(updatePost({id, title, content, tags}))
            dispatch(getPostById({post_id: id, nick: nickAuth}))
            setEdit!(false)
        }

        router.push(`/post_full?post_id=${id}`)
        return setTypePage("show my post")
    }

    const cansel = () => {
        setEdit!(false)
        setTypePage("show my post")
    }

    return(
        <div className={"flex flex-col my-[20px]"}>
            {
                edit !== undefined &&
                <div className={"w-full flex justify-end pb-[10px]"}>
                    <SmallButton
                        text={"X"}
                        handler={cansel}
                        disabled={false}
                        type={"delete"}
                    />
                </div>
            }
            <div className={"w-full"}>
                <div className={"flex flex-col gap-y-[10px]"}>
                    <Input
                        id={'title'}
                        value={title}
                        setValue={setTitle}
                        label={'title'}
                        type={'title'}
                        setConfirm={setConfirm}
                    />
                    <TextAreaInput
                        id={'content'}
                        value={content}
                        setValue={setContent}
                        label={'content'}
                        setConfirm={setConfirm}
                    />
                    <div id={"fakeBlock"} className={cn(show ?"visible " : "hidden")} />
                    {
                        tags.map((item, index) => (
                            <TagsInput
                                key={index}
                                index={index}
                                item={item}
                                setConfirm={setConfirm}
                            />
                        ))
                    }
                    <div>
                        <PostButton
                            text={"add tags"}
                            handler={addTagsFunc}
                        />
                    </div>
                </div>
                <Button
                    variant={"create"}
                    takeValue={send}
                    disabled={disabled}
                />
            </div>
        </div>
    )
}