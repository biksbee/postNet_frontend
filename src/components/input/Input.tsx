import cn from 'classnames'
import { FC, useEffect, useState } from 'react'
import { useDebounce } from "@/hooks/useDebounce";
import Image from "next/image";

import type { InputType } from "@/components/input/type";
import { inputValidation } from "@/components/input/type";

interface InputProps {
    id: string;
    value: string;
    setValue: (value: string) => void;
    label: string;
    type: InputType;
    icon?: string;
    setConfirm: (confirm: boolean) => void;
    delay?: number;
    drop?: boolean;
}

export const Input: FC<InputProps> = ({
                                          id,
                                          value,
                                          setValue,
                                          label,
                                          type,
                                          icon,
                                          setConfirm,
                                          delay = 300,
                                          drop = false
                                      }) => {

    const [test, setTest] = useState<string>(type)

    const [error, setError] = useState<boolean>(false)
    const [debounceValue, setDebounceValue] = useState<string>(value)
    const debounceItem = useDebounce(debounceValue, delay)

    const expression: RegExp = inputValidation[type]

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

    const viewPass = () => {
        setTest("text")
        setTimeout(() => {
            setTest("password")
        }, 2500)
    }

    const handlerValueInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        return setDebounceValue(e.target.value)
    }

    return (
        <div className='relative w-full'>
            <input
                id={id}
                value={debounceValue}
                type={test}
                onChange={handlerValueInput}
                className={cn(
                    "block",
                    "px-6 pt-6 pb-1 text-white",
                    "w-full text-md bg-neutral-700",
                    "appearance-none focus:outline-none focus:ring-0",
                    "peer",
                    drop ? "rounded-t-md" : "rounded-md",
                    error && "cb",
                )}
                placeholder=' '
            />
            {
                type === "password" && icon !== undefined &&
                <div
                    className={"absolute top-3.5 right-2 z-10"}
                    onClick={viewPass}
                >
                    <Image
                        src={`${icon}`}
                        alt={"view"}
                        width={25}
                        height={25}
                    />
                </div>
            }
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