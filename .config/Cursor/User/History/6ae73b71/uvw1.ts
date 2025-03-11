import { Module, MODULE_NAMES } from "@/constants/modules";
import { StoreConfig } from "@/constants/store";
import { GenericPostResponse } from "@/models/archive-models";
import { changeDatabasePool } from "@/services/database.service";
import capitalizeString from "@/utils/capitalize-string";
import { getCurrentWindow } from "@tauri-apps/api/window";
import { load } from "@tauri-apps/plugin-store";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { create } from "zustand";

interface PoolStore {
    isInitialized: boolean;
    setIsInitialized: (isInitialized: boolean) => void;
}

const usePoolStore = create<PoolStore>((set) => ({
  isInitialized: false,
  setIsInitialized: (isInitialized: boolean) => set({ isInitialized })
}));

export default function usePoolState(pathname: string) {
    const window = getCurrentWindow();

    const [_, setResponse] = useState<GenericPostResponse | null>(null)
    const { isInitialized, setIsInitialized } = usePoolStore()

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

        setIsInitialized(true)
        }
        catch (e) {
            console.error(e)

            toast.error(`No se pudo conectar a la base de datos de ${MODULE_NAMES[raw_module].toLocaleLowerCase()}. El modulo funcionará en modo local.`)
        } 
    } 

    useEffect(() => {
        if (window.label === "main") {
            console.log("jajaj pendejo")
            setPool()
        }
    }, [pathname])
}