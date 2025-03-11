import { Module } from "@/constants/modules";
import { GenericPostResponse } from "@/models/archive-models";
import { changeDatabasePool } from "@/services/database.service";
import capitalizeString from "@/utils/capitalize-string";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function usePoolState(pathname: string) {
    try {
    const [res, setResponse] = useState<GenericPostResponse | null>(null)

    const module = capitalizeString(pathname).replace("/", "") as Module
    console.log(module)

    const setPool = async () => {
        const data = await changeDatabasePool(module);

        setResponse(data)
    } 

    useEffect(() => {
        setPool()
    }, [pathname])
}
catch (e) {
    console.log(e)
    toast("Unhandled error loading database")
}
}