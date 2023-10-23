'use client'
import { FC } from "react";
import cn from 'classnames';

interface IItem {
    id: number;
    title: string;
    nick?: string;
    setCItem: (cItem: number) => void;
}

export const Item:FC<IItem> = ({id, title, nick = 'biksbee', setCItem}) => {

    return(
        <div
            onClick={() => setCItem(id)}
            className={'px-6 pt-4 pb-1 hover:text-black flex justify-between cursor-pointer'}
        >
            <div>
                {title}
            </div>
            <div>
                @{nick}
            </div>
        </div>
    )
}