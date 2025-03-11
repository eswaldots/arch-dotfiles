import { BoundingType } from "../-context/constants"

export interface BoundingBandForm {
    has_procedure: boolean
    procedure_description?: string
    organization_id?: string
    bouding_type: BoundingType
    reason?: string
    date?: string
}

