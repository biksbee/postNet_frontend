'use client'
import { FC, useState, useEffect } from 'react';
import cn from 'classnames';

import {PostsPage} from "@/components/posts/PostsPage";

interface HomeI {
    text?: string;
}

export const HomePage:FC<HomeI> = ({
                                       text = "hi"
}) => {



    return(
        <>
            <div className={cn("")}>
                <PostsPage
                    counter={3}
                />
            </div>
        </>

    )
}