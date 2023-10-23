'use client'
import { FC } from 'react';
import cn from 'classnames';

interface PageI {
    children: any;
}

export const Page:FC<PageI> = ({children}) => {
    return(
        <div
            className={cn(
                "w-full h-full flex flex-col md:items-start items-center",
                "mt-[80px] py-[20px] md:px-[100px]",
                "text-black",
            )}
        >
            {children}
        </div>
    )
}