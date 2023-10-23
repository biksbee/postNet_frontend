import {FC, useEffect, useState} from "react";
import cn from 'classnames';

import { Input } from "@/components/input/Input";
import { Button } from "@/components/button/button/Button";
import { DropDown } from "@/components/dropDown/DropDown";

import { useAppSelector, useAppDispatch } from "@/app/store/hooks/useActions";
import { searchByTitle } from "@/app/store/features/search/searchByTitle";
import {Loading} from "@/components/loading/Loading";

export const Search:FC = () => {

    const dispatch = useAppDispatch()
    const status = useAppSelector(state => state.searchTit.status)

    const [search, setSearch] = useState<string>("")
    const [confirm, setConfirm] = useState<boolean>(false)

    const [show, setShow] = useState<boolean>(false)

    useEffect(() => {
        if(search !== ""){
            setShow(true)
            dispatch(searchByTitle(search))
        } else setShow(false)
    }, [search]);

    return(
        <div
            className={cn(
                "w-full mb-[20px] rounded-xl flex bg-[rgba(0,0,0,.8)] text-white",
                "justify-between gap-x-10 items-center",
                "p-5"
            )}
        >
            <div className={'w-full relative'}>
                <Input
                    id={"search"}
                    value={search}
                    setValue={setSearch}
                    label={"search"}
                    type={"default"}
                    setConfirm={setConfirm}
                    drop={show}
                />
                {
                    show && status !== 'init' &&
                    <DropDown
                        status={status}
                    />
                }
            </div>
        </div>
    )
}
