'use client'
import { FC, useEffect, useState } from "react";
import { useRouter } from 'next/navigation';

import { useAppSelector, useActions } from "@/app/store/hooks/useActions";

import { Button } from "@/components/button/button/Button";
import {Loading} from "@/components/loading/Loading";

export const PostFullPage:FC = () => {

    // const [postId, setPostId] = useState<string>('')
    //
    // useEffect(() => {
    //     if (typeof window !== 'undefined') {
    //         const urlParams = new URLSearchParams(window.location.search);
    //         const id = urlParams.get('post_id')
    //         setPostId(id!)
    //     }
    // }, []);

    const item = useAppSelector(state => state.posts.postById)
    const status = useAppSelector(state => state.posts.postById.status)
    const router = useRouter()

    const render = () => {
        if (status === "init" || status === "loading") {
            return <Loading />;
        }
        if(status === "error"){
            return "Error happened";
        }
    };

    const backFunc = () => {
        router.back()
    }

    return(
        <div className={"w-full"}>
            {render()}
            <div className={"text-white text-[24px]"}>
                {item.post.title}
            </div>
            <div className={"text-[rgba(255,255,255,.7)] text-[18px]"}>
                {item.post.content}
            </div>
            <div className={"flex gap-x-[20px] mt-[20px] text-[#f00] text-[16px]"}>
                {
                    item.post.tags.map((item, index) => (
                        <div key={index} className={"underline"}>
                            #{item}
                        </div>
                    ))
                }
            </div>
            <div className={"w-[200px] mt-4"}>
                <Button
                    variant={"back"}
                    takeValue={backFunc}
                    disabled={false}
                />
            </div>
        </div>
    )
}