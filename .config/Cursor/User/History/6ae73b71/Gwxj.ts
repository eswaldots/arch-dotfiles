import { Module } from "@/constants/modules";
import { GenericPostResponse } from "@/models/archive-models";
import { changeDatabasePool } from "@/services/database.service";
import capitalizeString from "@/utils/capitalize-string";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function usePoolState(pathname: string) {
    const [response, setResponse] = useState<GenericPostResponse | null>(null)

    const module = capitalizeString(pathname.replace("/", "")) as Module

    const setPool = async () => {
        try {
        const data = await changeDatabasePool(module);

        setResponse(data)
        }
        catch (e) {
            console.error(e)

            toast.error("Error intentando conectarse a la base de datos")
        } 
    } 

    useEffect(() => {
        setPool()
    }, [pathname])
}