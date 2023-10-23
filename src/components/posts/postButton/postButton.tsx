import {FC, useEffect} from "react";
import cn from 'classnames';

interface IPostButton {
    text: string;
    handler: (event: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    type?: string;
    typePage?: "add Post" | "show all" | "show my post" | "show favorite" | "default";
}

export const PostButton:FC<IPostButton> = ({text, handler, disabled, type, typePage = "default"}) => {

    useEffect(() => {

    }, [typePage]);

    return(
        <button
            className={cn(
                "flex justify-center items-center w-[200px] h-[36px] mb-[20px] rounded-[22px] bg-[rgba(0,0,0,.8)] hover:bg-[rgba(0,0,0,.5)] duration-500 hover:cursor-pointer",
                    typePage === type && "cb"
            )}
            onClick={handler}
            disabled={disabled}
        >
            <div className={"flex gap-x-[10px] text-white hover:text"}>
                { text === "add Post" &&
                    <div className={"text-[24px]"}>
                    +
                    </div>
                }
                <div
                    className={cn(
                        "flex items-center",
                        text === "Cansel" && "text-[#f00]"
                    )}
                >
                    {text}
                </div>
            </div>
        </button>
    )
}