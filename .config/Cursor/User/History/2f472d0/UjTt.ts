import type { Bounding, PublicRepein, Records } from "@/models/analysis-model";
import { GenericGetResponse } from "@/models/archive-models";
import { BoundingRequest } from "@/routes/_app/analysis/_layout/management/bounding/-models/bounding-request";
import { invoke } from "@tauri-apps/api/core";

export async function getPublicRepein(search?: string) {
    try {
        if (search?.length === 0) {
            return await invoke<GenericGetResponse<PublicRepein[]>>("get_public_repein") 
        }
        return await invoke<GenericGetResponse<PublicRepein[]>>("get_public_repein", { search }) 
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

export async function getBoundings(search?: string) {
    try {
        return await invoke<GenericGetResponse<Bounding[]>>("get_public_boundings", { search })
    }
    catch(e) {
        return e as GenericGetResponse<null>
    }
}

export async function getPublicRepeinById(repeinId: number) {
    try {
        return await invoke<GenericGetResponse<PublicRepein[]>>("get_public_repein", { repeinId }) 
    }
    catch(e) {
        return e as GenericGetResponse<null>
    }
}