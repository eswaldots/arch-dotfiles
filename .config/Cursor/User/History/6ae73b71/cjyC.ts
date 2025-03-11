import { GenericPostResponse } from "@/models/archive-models";
import capitalizeString from "@/utils/capitalize-string";
import { invoke } from "@tauri-apps/api/core";
import { useEffect, useState } from "react";

export default function usePoolState(pathname: string) {
    const [res, setResponse] = useState<GenericPostResponse | null>(null)

    const module = capitalizeString(pathname).replace("/", "")

    const setPool = async () => {
        await invoke("change_database_pool", {module})
    } 

    useEffect(() => {
        setPool()
    }, [pathname])

    return { isLoading, setPool }
}