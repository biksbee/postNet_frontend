'use client'
import {FC, useEffect, useState} from "react";
import cn from 'classnames'

import {Item} from "@/components/navbar/Item";
import { Auth } from "@/components/navbar/Auth";
import { useAppSelector } from "@/app/store/hooks/useActions";
import api from "@/app/axios";
import {authSlice} from "@/app/store/features/auth/auth";

export const Navbar:FC = () => {


    const user = useAppSelector(state => state.persistedReducer.auth.user)
    const token = useAppSelector(state => state.persistedReducer.auth.user.token)
    const [authUser, setAuthUser] = useState<boolean>(false)

    useEffect(() => {
        if(token)
            setAuthUser(true)
        else setAuthUser(false)
    }, [token]);

    useEffect(() => {
        console.log("authUser: " + authUser)
    }, [authUser]);

    useEffect(() => {
        if(typeof window !== "undefined"){
            api.interceptors.request.use((config) => {
                config.headers.Authorization = token;
                return config
            })
        }
    }, []);

    return(
        <div className="w-screen  fixed top-0 z-[1000] py-[10px]">
            <ul
                className={cn(
                    "px-12 flex text-[#000] gap-x-[20px] items-center justify-between",
                    "text-[24px]"
                )}
            >
                <div id={"LOGO"}>

                </div>
                <div className='flex gap-x-[40px] items-center'>
                    <Item
                        text={"Home"}
                        href={"/"}
                    />
                    <Item
                        text={"Posts"}
                        href={"/posts"}
                    />
                    <Item
                        text={"Favorite"}
                        href={"/favorite"}
                    />
                    <Item
                        text={"Users"}
                        href={"/users"}
                    />
                    <Item
                        text={"Sign in"}
                        href={"/auth"}
                    />
                </div>
                <Auth
                    authUser={authUser}
                    text={user.name}
                    avatar={user.avatarurl}
                />
            </ul>
        </div>
    )
}