import {FC} from "react";
import useSimbolIterator from "@/hooks/useSimbolIterator";


interface IPageNumber {
    quan: number;
    setPage: (page: number) => void;

}

 export const PageNumber:FC<IPageNumber> = ({quan, setPage}) => {

    return(
        <div>
            <div className={"flex gap-x-[8px]"}>
                {useSimbolIterator((quan/5)).map((item:number, index:number) => (
                    <div
                        onClick={() => setPage(item+1)}
                        key={index}
                        className={"hover:cursor-pointer hover:border-white hover:border-[1px] duration-100 flex justify-center items-center text-white bg-[rgba(0,0,0,.8)] w-[16px]"}
                    >
                        {(item+1)}
                    </div>
                ))}
            </div>
        </div>
    )
}