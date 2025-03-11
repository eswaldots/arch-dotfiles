import { invoke } from "@tauri-apps/api/core";

export async function getPublicRepein() {
    return await invoke("get_public_repein")
}