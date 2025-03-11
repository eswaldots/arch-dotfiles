export interface RepeinJSON {
  personal_birthplace: string;
  personal_address: string;
  trait_build: string;
  trait_has_scars: string;
  fathers_phone: string;
  trait_nose_type: string;
  fathers_surname: string;
  trait_skin: string;
  fathers_name: string;
  personal_passport_expiration: Date;
  personal_licenses: string;
  personal_birthday: Date;
  personal_gender: string;
  trait_scars: string;
  relatives: string;
  trait_eyebrow_type: string;
  personal_ci: string;
  trait_hair_color: string;
  trait_face_type: string;
  personal_passport: string;
  personal_state_civil: string;
  personal_homeland_ci: string;
  fathers_ci: string;
  personal_passport_years_valid: string;
  personal_account_bank: string;
  personal_surnames: string;
  personal_phone: string;
  personal_name: string;
  trait_lips_type: string;
  personal_front_photo: string;
  trait_others: string;
  personal_coordinates: string;
  trait_eyes_color: string;
  trait_has_tattoos: string;
  trait_height: string;
  personal_nicknames: string;
  fathers_age: string;
  records: string;
  childrens: string;
  personal_age: string;
  trait_tattoos: string;
  fathers_birthday: string;
  personal_back_photo: string;
  trait_eyes_type: string;
  trait_hair_type: string;
  trait_hands_type: string;
}

export interface PublicRepein {
    repein_id: number,
    repein_ci: string,
    repein_name: string,
    repein_surnames: string,
    repein_nicknames: string,
    repein_state_civil: string,
    repein_age: number,
    repein_gender: string
}

export interface Records {
  id: string;
  record_name: string;
  record_type: string;
  record_organism: string;
  record_dependency: string;
  record_state: string;
  record_document: string;
  record_date: string;
  record_images: string;
}