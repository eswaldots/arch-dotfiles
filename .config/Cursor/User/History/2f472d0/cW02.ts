import { PublicRepein } from "@/models/analysis-model";
import { GenericGetResponse } from "@/models/archive-models";
import { invoke } from "@tauri-apps/api/core";

export async function getPublicRepein() {
    return await invoke<GenericGetResponse<PublicRepein>>("get_public_repein")
}