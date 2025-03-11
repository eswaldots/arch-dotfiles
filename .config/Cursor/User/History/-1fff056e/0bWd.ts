// El nombre se utiliza para mostrarlo en la UI del programa, mientras que el slug se utiliza para identificarlo en la base de datos

export enum BoundingType {
    RECORD = "record",
    OFFICE = "office"
}

export const BOUNDING_TYPES = [
    {
        name: "Expediente",
        slug: BoundingType.RECORD 
    },
    {
        name: "Oficio",
        slug: BoundingType.OFFICE
    },
] 
