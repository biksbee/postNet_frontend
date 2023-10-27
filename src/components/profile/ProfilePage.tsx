'use client'
import {FC, useState, useEffect, useRef} from "react";
import cn from 'classnames';
import {useRouter} from "next/navigation";
import Image from "next/image";

import { useAppSelector, useAppDispatch, useActions } from "@/app/store/hooks/useActions";
import { deleteUserById,  } from "@/app/store/features/auth/auth";
import { uploadFile } from "@/app/store/features/upload/upload";
import { PostButton } from "@/components/posts/postButton/postButton";
import {PostsPage} from "@/components/posts/PostsPage";

export const ProfilePage:FC = () => {

    const router = useRouter()

    const dispatch = useAppDispatch()
    const inputRef = useRef<HTMLInputElement>(null);
    const { logout} = useActions()

    const user = useAppSelector(state => state.persistedReducer.auth.user)
    const status = useAppSelector(state => state.upload.status)
    const auth = useAppSelector(state => state.persistedReducer.auth.user.id)
    const profilePhoto = useAppSelector(state => state.persistedReducer.auth.user.avatarurl)
    const photo = useAppSelector(state => state.upload.photo)

    const [imageError, setImageError] = useState(true);

    const uploadPhoto = async (event: React.ChangeEvent<HTMLInputElement>) => {
        try {
            const formData = new FormData();
            const fileList = event.target.files;
            if (fileList && fileList.length > 0) {
                const file = fileList[0];
                formData.append('file', file);
                await dispatch(uploadFile({id: auth, file: formData}))
            }
        } catch (e){
            console.log(e)
        }
    }

    useEffect(() => {
        // dispatch()
    }, [status]);

    const handleImageError = () => {
        setImageError(true);
    };

    const editUser = () => {

    }

    const logoutUser = () => {
        logout()
        router.push('/auth')
    }

    const deleteUser = async() => {
        await dispatch(deleteUserById(user.id))
        logout()
        router.push('/')
    }

    return(
        <div className={"flex flex-col p-4 gap-y-[50px] text-[#f00] w-full h-full"}>
            <div className={"w-full"}>
                <div className={"flex gap-x-5"}>
                    <div className={"flex flex-col gap-y-[15px]"}>
                        <div className={"bg-[rgba(0,0,0,.8)] w-[200px] h-[200px] text-white text-[64px] rounded-full flex justify-center items-center"}>
                            {imageError ?
                                <Image
                                    src={user.avatarurl}
                                    alt={""}
                                    width={200}
                                    height={200}
                                    className={`rounded-full h-full w-full`}
                                />
                                :
                                "?"
                            }
                        </div>
                        <PostButton
                            text={"upload photo"}
                            handler={() => inputRef.current && inputRef.current.click()}
                        />
                        <input ref={inputRef} type="file" onChange={uploadPhoto} hidden/>
                    </div>
                    <div className={"flex flex-col gap-y-5"}>
                        <div
                            className={cn(
                                "flex flex-col gap-x-5",
                                "text-white text-[26px]"
                            )}
                        >
                            <div>
                                Name: {user.name}
                            </div>
                            <div>
                                Username: @{user.nick}
                            </div>
                        </div>
                        <div className={"text-white text-[28px]"}>
                            {user.email}
                        </div>
                    </div>
                </div>
            </div>
            {/*<div>*/}
            {/*    <div className={"text-white text-[32px] flex mb-5"}>*/}
            {/*        Your last posts*/}
            {/*    </div>*/}
            {/*    <PostsPage*/}
            {/*        counter={100}*/}
            {/*        preType={"show my post"}*/}
            {/*    />*/}
            {/*</div>*/}
            <div>
                <div className={"text-white text-[32px] flex mb-5"}>
                    Settings
                </div>
                <div>
                    <PostButton
                        text={"Edit"}
                        handler={editUser}
                    />
                    <div className={"flex gap-x-5"}>
                        <PostButton
                            text={"Log out"}
                            handler={logoutUser}
                        />
                        <PostButton
                            text={"Delete"}
                            handler={deleteUser}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}