import {FC, useState} from "react";
import cn from 'classnames'

import { ButtonType } from "@/components/button/iconButton/type";
import { buttonStateType } from "@/components/button/iconButton/type";

interface IButton {
    text: string;
    handler: (event: React.MouseEvent<HTMLButtonElement>) => void;
    icon?: string;
    disabled: boolean;
    type: ButtonType;
}

export const SmallButton:FC<IButton> = ({text, handler, type, disabled}) => {

    return(
        <button
            className={cn(
                "w-[16px] h-[16px] rounded-full flex items-center justify-center text-[12px] hover:cursor-pointer duration-500",
                buttonStateType[type],
                disabled && "blur-sm",
            )}
            onClick={handler}
            disabled={disabled}
        >
            {text}
        </button>
    )
}