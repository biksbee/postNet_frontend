'use client'
import { FC, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import cn from 'classnames';

import { Item } from "@/components/dropDown/item/Item";

import { useAppDispatch, useAppSelector} from "@/app/store/hooks/useActions";
import {Loading} from "@/components/loading/Loading";
import {getPostById} from "@/app/store/features/posts/post";

interface IDropDown {
    status: "init" | "loading" | "error" | "success";
}

export const DropDown:FC<IDropDown> = ({status}) => {

    const router = useRouter()
    const dispatch = useAppDispatch()
    const items = useAppSelector(state => state.searchTit.result)
    const nickAuth = useAppSelector(state => state.persistedReducer.auth.user.nick)
    const [cItem, setCItem] = useState<number>(-1)

    const render = () => {
        if (status === "init" || status === "loading") {
            return <Loading />;
        }
        if(status === "error"){
            return "Error happened";
        }
    };

    useEffect(() => {
        if(cItem !== -1){
            dispatch(getPostById({post_id: cItem, nick: nickAuth}))
            router.push(`/post_full?post_id=${cItem}`)
        }
        setCItem(-1)
    }, [cItem]);

    return(
        <div
            className={cn(
            'absolute max-h-[300px] overflow-y-auto duration-500 flex flex-col bg-neutral-700 text-white w-full',
                'rounded-b-md',
                // 'border-x-[2px] border-b-[2px]'
            )}
        >
            {render()}
            {
                items.map((item, index) => (
                    <Item
                        key={index}
                        id={item.id}
                        title={item.title}
                        setCItem={setCItem}
                        nick={item.nick}
                    />
                ))
            }
        </div>
    )
}