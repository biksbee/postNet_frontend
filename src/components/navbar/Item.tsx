import {FC } from 'react';
import cn from 'classnames';

interface ItemI {
    text: string;
    href: string;
}

export const Item:FC<ItemI> = ({text, href}) => {

    return(
        <a
            className={'px-6 py-[6px] hover:bg-black bg-opacity-90 hover:text-white duration-500 rounded-lg'}
            href={href}
        >
            <li
                className={cn(
                    'duration-500'
                )}
            >
                {text}
            </li>
        </a>
    )
}