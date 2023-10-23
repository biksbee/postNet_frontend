import {FC, useEffect} from "react";
import {Item} from "@/components/posts/postItem/Item";
import {PageNumber} from "@/components/posts/numberPage/PageNumber";

import { useAppSelector } from "@/app/store/hooks/useActions";

interface IItem {
    id: number;
    title: string;
    content: string;
    date_change: string;
    tags: string[];
    user_id: number;
    nick: string;
    isfavorite: boolean;
}

interface PostList {
    items: IItem[];
    counter: number;
    quan: number;
    setPage: (page: number) => void;
    quanCurrent: number;
    setQuanCurrent: (quanCurrent: number) => void;
    setTypePage: (typePage: "add Post" | "show all" | "show my post" | "show favorite") => void;
    typePage: "add Post" | "show all" | "show my post" | "show favorite"
}



export const PostList:FC<PostList> = ({
    items,
    counter,
    quan,
    setPage,
    quanCurrent,
    setQuanCurrent,
    setTypePage,
    typePage
}) => {

    const authNick = useAppSelector(state => state.persistedReducer.auth.user.nick)
    // const nick = useAppSelector(state => state.posts.items.nick)

    return(
        <>
            <div className={"flex flex-col gap-y-[20px]"}>
                {
                    items.map((item, index) => (
                        <div
                            key={index}
                            className={"w-max"}
                        >
                            <Item
                                id={item.id}
                                title={item.title}
                                content={item.content}
                                date_change={item.date_change}
                                tags={item.tags}
                                nick={item.nick}
                                isfavorite={item.isfavorite}
                                quanCurrent={quanCurrent}
                                setQuanCurrent={setQuanCurrent}
                                authNick={authNick}
                                setTypePage={setTypePage}
                                typePage={typePage}
                            />
                        </div>
                    ))
                }
            </div>
            {counter === 5 &&
                <div className={"pt-[10px] pb-[20px]"}>
                    <PageNumber
                        quan={quan}
                        setPage={setPage}
                    />
                </div>}
        </>
    )
}