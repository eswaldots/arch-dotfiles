import { Module } from "@/constants/modules";
import { invoke } from "@tauri-apps/api/core";

export async function changeDatabasePool(module: Module) {
    console.log("change dtabase")
    return await invoke("change_database_pool", { module });
}