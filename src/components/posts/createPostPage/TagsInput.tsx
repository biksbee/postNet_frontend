import {FC, useEffect, useState} from "react";

import {SmallButton} from "@/components/button/iconButton/smallButton";

import {useAppDispatch, useActions, useAppSelector} from "@/app/store/hooks/useActions";
import cn from "classnames";
import { useRouter } from "next/navigation"
import {useDebounce} from "@/hooks/useDebounce";
import {inputValidation} from "@/components/input/type";

interface ITagsInput {
    index: number;
    item: string;
    setConfirm: (confirm: boolean) => void;
}

export const TagsInput:FC<ITagsInput> = ({index, item, setConfirm}) => {

    const router = useRouter()
    const expression: RegExp = inputValidation['tags']
    const tags = useAppSelector(state => state.posts.item.tags)
    const { deleteTag, writeTag } = useActions()

    const [error, setError] = useState<boolean>(false)
    const [onActive, setOnActive] = useState<boolean>(true)
    const [debounceValue, setDebounceValue] = useState<string>(item ?? "")
    const debounceItem = useDebounce(debounceValue, 400)

    useEffect(() => {
        if(debounceValue === "send"){
            setDebounceValue('')
        }
    }, [debounceValue]);

    useEffect(() => {
        if(expression.test(debounceItem)){
            setDebounceValue(debounceItem)
            if(debounceValue.trim() !== ""){
                writeTag({writeTags: debounceValue, index})
            }
            setConfirm(true)
            setError(false)
            setOnActive(false)
        } else {
            setConfirm(false)
            setDebounceValue('')
            setError(true)
        }
    }, [debounceItem])

    const deleteTags = () => {
        deleteTag(index)
    }

    const handlerValueInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        return setDebounceValue(e.target.value)
    }

    return(
        <div
            className='relative'
        >
            <input
                id={`#tags ${index}`}
                value={debounceValue}
                type={'tags'}
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
                    absolute text-md text-zinc-400 duration-150
                    transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-6
                    peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-3
                '
                htmlFor={`#tags ${index}`}
            >
                {`#tags ${index}`}
            </label>
            {
                !onActive &&
                <div
                    onClick={() => setOnActive(true)}

                    className={cn(
                        "absolute top-0 z-10 h-[54px] rounded-md",
                        "px-6 flex items-center py-4 text-white",
                        "w-full text-md bg-neutral-700",
                        "appearance-none focul:outline-none focus:ring-0",
                        "peer",
                    )}
                >
                    {item}
                </div>
            }
            <div
                className={"absolute z-10 right-2 top-[20px]"}
            >
                <SmallButton
                    text={"X"}
                    handler={deleteTags}
                    disabled={false}
                    type={"delete"}
                />
            </div>
        </div>
    )
}