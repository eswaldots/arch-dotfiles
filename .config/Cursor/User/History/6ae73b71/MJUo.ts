import { Module, MODULE_NAMES } from "@/constants/modules";
import { StoreConfig } from "@/constants/store";
import { GenericPostResponse } from "@/models/archive-models";
import { changeDatabasePool } from "@/services/database.service";
import capitalizeString from "@/utils/capitalize-string";
import { load } from "@tauri-apps/plugin-store";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function usePoolState(pathname: string) {
    const [_, setResponse] = useState<GenericPostResponse | null>(null)

    const raw_module = pathname.replace("/", "") as Module
    const module = capitalizeString(raw_module) as Module

    const setPool = async () => {
        const store = await load(StoreConfig.FILE_NAME, { autoSave: false })

        const localMode = await store.get(StoreConfig.LOCAL_MODE_KEY(raw_module))

        if (localMode) {
            return;
        }

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