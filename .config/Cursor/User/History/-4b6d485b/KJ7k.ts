import { BoundingType } from "../-context/constants"

export interface BoundingBandForm {
    bouding_type: BoundingType

    organization_id?: string
    document_id?: string

    reason?: string
    date?: string

    has_procedure: boolean
    procedure_description?: string
}

