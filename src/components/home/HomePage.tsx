'use client'

import { FC } from 'react';
import cn from 'classnames';

interface HomeI {
    text?: string;
}

export const HomePage:FC<HomeI> = ({
                                       text = "hi"
}) => {

    return(
        <div className={cn("text-[#f00]")}>

        </div>
    )
}