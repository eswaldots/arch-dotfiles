import { Module, MODULE_NAMES } from "@/constants/modules";
import { GenericPostResponse } from "@/models/archive-models";
import { changeDatabasePool } from "@/services/database.service";
import capitalizeString from "@/utils/capitalize-string";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function usePoolState(pathname: string) {
    const [_response, setResponse] = useState<GenericPostResponse | null>(null)

    const raw_module = pathname.replace("/", "") as Module
    const module = capitalizeString(raw_module) as Module

    const setPool = async () => {
        try {
        const data = await changeDatabasePool(module);

        setResponse(data)
        }
        catch (e) {
            console.error(e)

            toast.error(`No se pudo conectar a la base de datos de ${MODULE_NAMES[raw_module].toLocaleLowerCase()}. El modulo funcionará en modo local.`)
        } 
    } 

    useEffect(() => {
        setPool()
    }, [pathname])
}