import cn from 'classnames'
import { FC, useEffect, useState } from 'react'
import { useDebounce } from "@/hooks/useDebounce";

import type { InputType } from "@/components/input/type";
import { inputValidation } from "@/components/input/type";

interface InputProps {
    id: string;
    value: string;
    setValue: (value: string) => void;
    label: string;
    icon?: string;
    setConfirm: (confirm: boolean) => void;
}

export const TextAreaInput: FC<InputProps> = ({
                                          id,
                                          value,
                                          setValue,
                                          label,
                                          icon,
                                          setConfirm,
                                      }) => {

    const [error, setError] = useState<boolean>(false)
    const [debounceValue, setDebounceValue] = useState<string>(value)
    const debounceItem = useDebounce(debounceValue, 300)

    const expression: RegExp = inputValidation['content']

    useEffect(() => {
        if(value === "send"){
            setDebounceValue('')
        }
    }, [value]);

    useEffect(() => {
        if(expression.test(debounceItem)){
            setValue(debounceItem)
            setConfirm(true)
            setError(false)
        } else {
            setConfirm(false)
            setValue('')
            setError(true)
        }
    }, [debounceItem])

    const handlerValueInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        return setDebounceValue(e.target.value)
    }

    return (
        <div className='relative'>
            <textarea
                id={id}
                value={debounceValue}
                onChange={handlerValueInput}
                className={cn(
                    "block rounded-md",
                    "px-6 pt-6 pb-1 text-white",
                    "w-full text-md bg-neutral-700",
                    "appearance-none focul:outline-none focus:ring-0",
                    "peer",
                    error && "cb",
                )}
                placeholder=' '
            />
            <label
                className='
                    absolute
                    text-md
                    text-zinc-400
                    duration-150
                    transform
                    -translate-y-3
                    scale-75
                    top-4
                    z-10
                    origin-[0]
                    left-6
                    peer-placeholder-shown:scale-100
                    peer-placeholder-shown:translate-y-0
                    peer-focus:-translate-y-3
                '
                htmlFor={id}
            >
                {id}
            </label>
        </div>
    )
}