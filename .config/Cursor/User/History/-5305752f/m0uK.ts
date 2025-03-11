import { Module } from "@/constants/modules";
import { invoke } from "@tauri-apps/api/core";

export async function changeDatabasePool(module: Module) {
    return await invoke("change_database_pool", { module.charAt(0).toUpperCase() + module.slice(1) });
}