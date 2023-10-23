import { FC } from "react";
import Image from "next/image";

interface IUser {
    name: string;
    nick: string;
    email: string;
    avatar: string;
}

export const User:FC<IUser> = ({name, nick, avatar, email}) => {

    return(
        <div className={"relative bg-[#fff] p-[20px] xl:w-[500px] w-[80vw] rounded-[12px]"}>
            <div className={"flex"}>
                <div className={`w-[150px] h-[150px] bg-[url(/image/firesunset.jpg)] bg-cover bg-center rounded-full `}>
                    {/*<Image*/}
                    {/*    src={`/image/firesunset.jpg`}*/}
                    {/*    alt={"avatar"}*/}
                    {/*    width={500}*/}
                    {/*    height={500}*/}
                    {/*    className={""}*/}
                    {/*/>*/}
                </div>
                <div>
                    <div className={"w-full flex justify-center mb--[10px]"}>
                        {nick}
                    </div>
                    <div>
                        {name}
                    </div>
                    <div>
                        {email}
                    </div>
                </div>
            </div>
        </div>
    )
}