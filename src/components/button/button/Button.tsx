import { FC, useState, useEffect } from 'react';
import cn from 'classnames'
import type { ButtonType } from "@/components/button/button/type";
import { buttonStyle } from "@/components/button/button/type"

interface IButton {
    variant: string;
    takeValue: (event: React.MouseEvent<HTMLButtonElement>) => void;
    disabled: boolean;
}

export const Button:FC<IButton> = ({variant, takeValue, disabled}) => {

    const [type, setType] = useState<ButtonType>("disabled")

    useEffect(() => {
        if (!disabled){
            setType("default")
        } else {
            setType("disabled")
        }
    }, [disabled]);

    return (
            <button
                className={cn(
                    'py-3 text-white rounded-md w-full transition duration-500 bg-[#f00]',
                    buttonStyle[type],
                    !disabled && buttonStyle["pressed"]
                )}
                onMouseEnter={!disabled ? () => setType("hover") : () => {}}
                onMouseLeave={!disabled ? () => setType("default") : () => {}}
                onClick={takeValue}
                disabled={disabled}
            >
                {variant}
            </button>
    )
}