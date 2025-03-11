use serde::{Deserialize, Serialize};
use thiserror::Error;

#[derive(Serialize, Deserialize)]
pub struct RepeinJSON {
    pub personal_birthplace: String,
    pub personal_address: String,
    pub trait_build: String,
    pub trait_has_scars: String,
    pub fathers_phone: String,
    pub trait_nose_type: String,
    pub fathers_surname: String,
    pub trait_skin: String,
    pub fathers_name: String,
    pub personal_passport_expiration: String,
    pub personal_licenses: String,
    pub personal_birthday: String,
    pub personal_gender: String,
    pub trait_scars: String,
    pub relatives: String,
    pub trait_eyebrow_type: String,
    pub personal_ci: String,
    pub trait_hair_color: String,
    pub trait_face_type: String,
    pub personal_passport: String,
    pub personal_state_civil: String,
    pub personal_homeland_ci: String,
    pub fathers_ci: String,
    pub personal_passport_years_valid: String,
    pub personal_account_bank: String,
    pub personal_surnames: String,
    pub personal_phone: String,
    pub personal_name: String,
    pub trait_lips_type: String,
    pub personal_front_photo: String,
    pub trait_others: String,
    pub personal_coordinates: String,
    pub trait_eyes_color: String,
    pub trait_has_tattoos: String,
    pub trait_height: String,
    pub personal_nicknames: String,
    pub fathers_age: String,
    pub records: String,
    pub childrens: String,
    pub personal_age: String,
    pub trait_tattoos: String,
    pub fathers_birthday: String,
    pub personal_back_photo: String,
    pub trait_eyes_type: String,
    pub trait_hair_type: String,
    pub trait_hands_type: String,
}

#[derive(Serialize, Deserialize)]
pub struct Children {
    pub id: String,
    pub children_name: String,
    pub children_surnames: String,
    pub children_birthday: String,
    pub children_age: String,
    pub children_grade: String,
}

#[derive(Serialize, Deserialize)]
pub struct Relative {
    pub id: String,
    pub relationship: String,
    pub relative_name: String,
    pub relative_surname: String,
    pub relative_birthday: String,
    pub relative_age: String,
    pub relative_grade: String,
    pub relative_phone: String,
    pub relative_address: String,
}

#[derive(Serialize, Deserialize)]
pub struct Records {
    pub id: i32,
    pub record_name: String,
    pub record_type: String,
    pub record_organism: String,
    pub record_dependency: String,
    pub record_state: String,
    pub record_document: String,
    pub record_date: String,
    pub record_images: String,
}

#[derive(Error, Debug)]
pub enum RepeinError {
    #[error("Invalid JSON: {0}")]
    InvalidJson(#[from] serde_json::Error),
    #[error("Failed to connect to database: {0}")]
    DatabaseError(#[from] sqlx::Error),
}

#[derive(Deserialize, Serialize)]
pub struct PublicRepein {
    pub repein_id: i32,
    pub repein_ci: String,
    pub repein_name: String,
    pub repein_surnames: String,
    pub repein_nicknames: String,
    pub repein_state_civil: String,
    pub repein_age: i32,
    pub repein_gender: String
}

#[derive(Deserialize, Serialize)]
pub struct BoundingRequest {
    pub repein_id: i32,
    pub band_id: i32,
    pub organism_id: i32,
    pub bounding_band: Vec<BoundingBand>,
    pub repein_records: Vec<Records>
}

#[derive(Deserialize, Serialize)]
pub struct BoundingBand {
    pub bounding_type: String,
    pub organization_id: i32,
    pub document_id: String,
    pub reason: String,
    pub date: String,
    pub has_procedure: bool,
    pub procedure_description: String,
}
