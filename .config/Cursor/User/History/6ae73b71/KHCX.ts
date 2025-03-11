import { Module } from "@/constants/modules";
import { GenericPostResponse } from "@/models/archive-models";
import { changeDatabasePool } from "@/services/database.service";
import capitalizeString from "@/utils/capitalize-string";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function usePoolState(pathname: string) {
    try {
    const [res, setResponse] = useState<GenericPostResponse | null>(null)

    console.log(pathname)
    const module = capitalizeString(pathname) as Module

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