import { Module } from "@/constants/modules";
import { GenericPostResponse } from "@/models/archive-models";
import { invoke } from "@tauri-apps/api/core";

export async function changeDatabasePool(module: Module) {
    const res = await invoke<GenericPostResponse>("change_database_pool", { module });

    return res
}