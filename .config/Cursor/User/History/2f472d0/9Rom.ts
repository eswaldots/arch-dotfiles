import type { PublicRepein, Records } from "@/models/analysis-model";
import { GenericGetResponse } from "@/models/archive-models";
import { BoundingRequest } from "@/routes/_app/analysis/_layout/management/bounding/-models/bounding-request";
import { invoke } from "@tauri-apps/api/core";

export async function getPublicRepein() {
    try {
        return await invoke<GenericGetResponse<PublicRepein[]>>("get_public_repein") 
    }
    catch(e) {
        return e as GenericGetResponse<null>
    }
}

export async function getRepeinRecordsById(repeinId: number) {
    try {
        return await invoke<GenericGetResponse<Records[]>>("get_repein_records_by_id", { repeinId })
    }
    catch(e) {
        return e as GenericGetResponse<null>
    }
}

export async function submitBounding(bounding: BoundingRequest) {
    try {
        return await invoke<GenericGetResponse<string>>("save_bounding", { boundingRequest: bounding })
    }
    catch(e) {
        return e as GenericGetResponse<null>
    }
}