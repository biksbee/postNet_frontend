'use client';

import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "@/app/store/store";
import { Loading } from "@/components/loading/Loading";

//@ts-ignore
export const PersistGates = ({children}) => {
    return(
        <PersistGate loading={<Loading />}  persistor={persistor}>
            {children}
        </PersistGate>
    )
}