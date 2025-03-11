import capitalizeString from "@/utils/capitalize-string";
import { invoke } from "@tauri-apps/api/core";
import { useEffect, useState } from "react";

export default function usePoolState(pathname: string) {
    const [isLoading, setIsLoading] = useState(false)

    const module = capitalizeString(pathname).replace("/", "")

    const setPool = async () => {
        await invoke("change_database_pool", {module})
    } 

    useEffect(() => {
        setPool()
    }, [pathname])

    return { isLoading, setPool }
}