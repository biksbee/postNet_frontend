'use client'
import { FC, useEffect }  from 'react';

import { useActions, useAppDispatch, useAppSelector} from "@/app/store/hooks/useActions";
import {fetchUsers} from "@/app/store/features/user/user";
import { Loading } from "@/components/loading/Loading";
import Image from "next/image";
import {User} from "@/components/users/items/User";


export const UserPage:FC = () => {

    const status = useAppSelector(state => state.users.status)
    const users = useAppSelector(state => state.users.users)
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchUsers())
    }, []);

    const render = () => {
        if (status === "init" || status === "loading") {
            return <Loading />;
        }
        if(status === "error"){
            return "Error happened";
        }
    };

    return(
        <div>
            {render()}
            <div
                className={"flex flex-col gap-y-[20px]"}
            >
                {users.map((item, index) => (
                    <div key={index}>
                        <User
                            name={item.name}
                            nick={item.nick}
                            email={item.email}
                            avatar={item.avatarurl}
                        />
                    </div>
                ))}
            </div>

        </div>
    )
}