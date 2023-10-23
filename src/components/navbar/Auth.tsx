import {FC, useEffect, useState} from "react";
import { useRouter } from 'next/navigation';
import cn from 'classnames';

interface IAuth {
    authUser: boolean
    text?: string;
    avatar?: string;
}

export const Auth:FC<IAuth> = ({authUser, text = 'A', avatar}) => {

    const router = useRouter()

    const myProfile = () => {
        if(authUser){
            router.push('/profile')
        } else router.push('/auth')
    }

    return(
            <div
                onClick={myProfile}
                className={cn(
                    "w-[50px] h-[50px] bg-[rgba(0,0,0,.8)] flex justify-center items-center rounded-full text-white text-[32px] cursor-pointer"
                )}
            >
                {!authUser ? "?" : text[1]}
            </div>
    )
}