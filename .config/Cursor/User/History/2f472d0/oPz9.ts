import { PublicRepein } from "@/models/analysis-model";
import { GenericGetResponse } from "@/models/archive-models";
import { invoke } from "@tauri-apps/api/core";

export async function getPublicRepein() {
    try {
        return await invoke<GenericGetResponse<PublicRepein>>("get_public_repein") 
    }
    catch(e) {
        return e as GenericGetResponse<null>
    }
}