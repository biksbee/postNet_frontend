import {FC, useEffect, useState} from "react";
import { useRouter } from 'next/navigation';
import Image from 'next/image'
import cn from 'classnames';

interface IAuth {
    authUser: boolean
    text?: string;
    avatar?: string;
}

export const Auth:FC<IAuth> = ({authUser, text = 'A', avatar = '/question.svg'}) => {

    const router = useRouter()

    const [imageError, setImageError] = useState(false)


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
                {!authUser ?
                    <Avatar
                        url={'/question.svg'}
                        setImageError={setImageError}
                    />
                    :
                    <Avatar
                        url={avatar}
                        setImageError={setImageError}
                    />
                }
            </div>
    )
}

interface avatar {
    url: string
    setImageError: (imageError: boolean) => void;
}

const Avatar:FC<avatar> = ({url, setImageError}) => {

    const handleImageError = () => {
        setImageError(true)
    }

    return(
        <Image
            src={url}
            alt={'avatar'}
            width={50}
            height={50}
            className={'w-full h-full rounded-full'}
            onError={handleImageError}
        />
    )
}