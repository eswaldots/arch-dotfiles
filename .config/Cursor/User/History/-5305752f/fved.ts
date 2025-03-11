import { Module } from "@/constants/modules";
import { invoke } from "@tauri-apps/api/tauri";

export async function changeDatabasePool(module: Module) {
    return await invoke("change_database_pool", { module });
}