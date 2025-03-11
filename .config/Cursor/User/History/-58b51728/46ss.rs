use crate::{
    definitions::{
        database_definitions::Database,
        personal_definitions::{
            Children, CompressedPersonal, Educational, Labor, Operational, PersonalJSON,
            PersonalSQL, PublicPersonal, Record, Relative, Study,
        },
    },
    utils::{
        bytea_to_string::bytea_to_string, generate_random_id::generate_random_id,
        image_to_bytea::image_to_bytea, string_to_bool::string_to_bool,
        string_to_int::string_to_int,
    },
};
use sqlx::Row;

pub async fn create_personal(pool: &Database, personal: PersonalJSON) -> Result<(), sqlx::Error> {
    let id = generate_random_id(0, 10000);

    match pool {
        Database::Sqlite(_) => Ok(()),
        Database::PostgreSQL(pool) => {
            let personal_query = r#"
        INSERT INTO personal (
            personal_id,
            personal_ci,
            personal_passport,
            personal_passport_expiration,
            personal_passport_years_valid,
            personal_name,
            personal_surnames,
            personal_birthday,
            personal_gender,
            personal_state_civil,
            personal_birthplace,
            personal_age,
            personal_phone,
            personal_address,
            personal_coordinates,
            personal_licenses,
            personal_front_photo,
            personal_back_photo,
            personal_homeland_ci,
            personal_bank_account
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20)
    "#;

            let trait_query = r#"
                INSERT INTO traits (
                    trait_personal_id,
                    trait_build,
                    trait_height,
                    trait_skin,
                    trait_has_tattoos,
                    trait_tattoos,
                    trait_hair_color,
                    trait_hair_type,
                    trait_eye_color,
                    trait_eye_shape,
                    trait_eyebrow_type,
                    trait_nose_type,
                    trait_lips_type,
                    trait_hands_type,
                    trait_others
                ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) 
            "#;

            let fathers_query = r#"
                INSERT INTO fathers (
                    fathers_personal_id,
                    fathers_name,
                    fathers_surname,
                    fathers_ci,
                    fathers_birthday,
                    fathers_age,
                    fathers_phone
                ) VALUES ($1, $2, $3, $4, $5, $6, $7)
            "#;

            let children_query = r#"
                INSERT INTO children (
                    children_personal_id,
                    children_name,
                    children_surname,
                    children_birthday,
                    children_age,
                    children_grade
                ) VALUES ($1, $2, $3, $4, $5, $6)
            "#;

            let relatives_query = r#"
                INSERT INTO relatives (
                    relative_personal_id,
                    relative_relationship,
                    relative_name,
                    relative_surname,
                    relative_birthday,
                    relative_age,
                    relative_grade,
                    relative_phone,
                    relative_address
                ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
            "#;

            let education_query = r#"
                INSERT INTO educations (
                    education_personal_id,
                    education_grade,
                    education_institution,
                    education_date_end,
                    education_archive
                ) VALUES ($1, $2, $3, $4, $5)
            "#;

            let professional_query = r#"
                INSERT INTO professional (
                    professional_personal_id,
                    professional_course_name,
                    professional_institution,
                    professional_date
                ) VALUES ($1, $2, $3, $4)
            "#;

            let labor_query = r#"
                INSERT INTO labor (
                    labor_personal_id,
                    labor_name,
                    labor_phone,
                    labor_boss,
                    labor_date_start,
                    labor_date_end
                ) VALUES ($1, $2, $3, $4, $5, $6)
            "#;

            let health_query = r#"
                INSERT INTO health (
                    health_personal_id,
                    health_blood_group,
                    health_allergies,
                    health_operations,
                    health_has_fractures,
                    health_fractures_description
                ) VALUES ($1, $2, $3, $4, $5, $6)
            "#;

            let operational_query = r#"
                INSERT INTO operational (
                    operational_personal_id,
                    operational_organization_name,
                    operational_position,
                    operational_date_start,
                    operational_date_end,
                    operational_phone,
                    operational_image
                ) VALUES ($1, $2, $3, $4, $5, $6, $7)
            "#;

            let record_query = r#"
                INSERT INTO records (
                    record_personal_id,
                    record_name,
                    record_type
                ) VALUES ($1, $2, $3)
            "#;

            let others_query = r#"
                INSERT INTO others (
                    others_personal_id,
                    others_description
                ) VALUES ($1, $2)
            "#;

            let transaction = pool.begin().await?;

            sqlx::query(personal_query)
                .bind(id)
                .bind(string_to_int(&personal.personal_ci).unwrap_or(0))
                .bind(&personal.personal_passport)
                .bind(&personal.personal_passport_expiration)
                .bind(string_to_int(&personal.personal_passport_years_valid).unwrap_or(0))
                .bind(&personal.personal_name)
                .bind(&personal.personal_surnames)
                .bind(&personal.personal_birthday)
                .bind(&personal.personal_gender)
                .bind(&personal.personal_state_civil)
                .bind(&personal.personal_birthplace)
                .bind(string_to_int(&personal.personal_age).unwrap_or(0))
                .bind(&personal.personal_phone)
                .bind(&personal.personal_address)
                .bind(&personal.personal_coordinates)
                .bind(&personal.personal_licenses)
                .bind(image_to_bytea(&personal.personal_front_photo).unwrap_or_default())
                .bind(image_to_bytea(&personal.personal_back_photo).unwrap_or_default())
                .bind(string_to_int(&personal.personal_homeland_ci).unwrap_or(0))
                .bind(&personal.personal_account_bank)
                .execute(pool)
                .await?;

            sqlx::query(trait_query)
                .bind(id)
                .bind(&personal.trait_build)
                .bind(string_to_int(&personal.trait_height).unwrap_or(0))
                .bind(&personal.trait_skin)
                .bind(string_to_bool(&personal.trait_has_tattoos).unwrap_or(false))
                .bind(
                    image_to_bytea(&personal.trait_tattoos.unwrap_or_default()).unwrap_or_default(),
                )
                .bind(&personal.trait_hair_color)
                .bind(&personal.trait_hair_type)
                .bind(&personal.trait_eyes_color)
                .bind(&personal.trait_eyes_type)
                .bind(&personal.trait_eyebrow_type)
                .bind(&personal.trait_nose_type)
                .bind(&personal.trait_lips_type)
                .bind(&personal.trait_hands_type)
                .bind(personal.trait_others.unwrap_or_default())
                .execute(pool)
                .await?;

            sqlx::query(fathers_query)
                .bind(id)
                .bind(&personal.fathers_name)
                .bind(&personal.fathers_surname)
                .bind(&personal.fathers_ci)
                .bind(&personal.fathers_birthday)
                .bind(string_to_int(&personal.fathers_age).unwrap_or(0))
                .bind(&personal.fathers_phone)
                .execute(pool)
                .await?;

            if let Ok(childrens) = serde_json::from_str::<Vec<Children>>(&personal.childrens) {
                for child in childrens {
                    sqlx::query(children_query)
                        .bind(id)
                        .bind(&child.children_name)
                        .bind(&child.children_surnames)
                        .bind(&child.children_birthday)
                        .bind(string_to_int(&child.children_age).unwrap_or(0))
                        .bind(&child.children_grade)
                        .execute(pool)
                        .await?;
                }
            } else {
                if let Err(err) = serde_json::from_str::<Vec<Children>>(&personal.childrens) {
                    println!("{:?}", err);
                }
            }

            if let Ok(operationals) =
                serde_json::from_str::<Vec<Operational>>(&personal.operationals)
            {
                for operational in operationals {
                    sqlx::query(&operational_query)
                        .bind(id)
                        .bind(&operational.operational_organization_name)
                        .bind(&operational.operational_position)
                        .bind(&operational.operational_date_start)
                        .bind(&operational.operational_date_end)
                        .bind(&operational.operational_phone)
                        .bind(image_to_bytea(&operational.operational_image).unwrap_or_default())
                        .execute(pool)
                        .await?;
                }
            }

            if let Ok(educationals) =
                serde_json::from_str::<Vec<Educational>>(&personal.educationals)
            {
                for educational in educationals {
                    sqlx::query(&education_query)
                        .bind(id)
                        .bind(&educational.educational_grade)
                        .bind(&educational.educational_institution)
                        .bind(&educational.educational_date_end)
                        .bind(image_to_bytea(&educational.educational_archive).unwrap_or_default())
                        .execute(pool)
                        .await?;
                }
            }

            if let Ok(relatives) = serde_json::from_str::<Vec<Relative>>(&personal.relatives) {
                for relative in relatives {
                    sqlx::query(relatives_query)
                        .bind(id)
                        .bind(&relative.relationship)
                        .bind(&relative.relative_name)
                        .bind(&relative.relative_surname)
                        .bind(&relative.relative_birthday)
                        .bind(string_to_int(&relative.relative_age).unwrap_or(0))
                        .bind(&relative.relative_grade)
                        .bind(&relative.relative_phone)
                        .bind(&relative.relative_address)
                        .execute(pool)
                        .await?;
                }
            }

            if let Ok(professionals) = serde_json::from_str::<Vec<Study>>(&personal.studies) {
                for professional in professionals {
                    sqlx::query(professional_query)
                        .bind(id)
                        .bind(&professional.study_name)
                        .bind(&professional.study_institution)
                        .bind(&professional.study_date)
                        .bind(image_to_bytea(&professional.study_document).unwrap_or_default())
                        .execute(pool)
                        .await?;
                }
            }

            if let Ok(labors) = serde_json::from_str::<Vec<Labor>>(&personal.labors) {
                for labor in labors {
                    sqlx::query(labor_query)
                        .bind(id)
                        .bind(&labor.labor_name)
                        .bind(&labor.labor_phone)
                        .bind(&labor.labor_boss)
                        .bind(&labor.labor_date_start)
                        .bind(&labor.labor_date_end)
                        .execute(pool)
                        .await?;
                }
            }

            if let Ok(records) = serde_json::from_str::<Vec<Record>>(&personal.records) {
                for record in records {
                    sqlx::query(record_query)
                        .bind(id)
                        .bind(&record.record_name)
                        .bind(&record.record_type)
                        .execute(pool)
                        .await?;
                }
            }

            sqlx::query(health_query)
                .bind(id)
                .bind(&personal.health_blood_group)
                .bind(&personal.health_allergies)
                .bind(&personal.health_operations)
                .bind(string_to_bool(&personal.health_has_fractures).unwrap_or(false))
                .bind(image_to_bytea(&personal.health_fractures).unwrap_or_default())
                .execute(pool)
                .await?;

            transaction.commit().await?;

            Ok(())
        }
    }
}

pub async fn get_public_personal(
    pool: &Database,
    param: String,
) -> Result<Vec<PublicPersonal>, sqlx::Error> {
    let query = &format!("SELECT personal.personal_id, personal.personal_ci, personal.personal_surnames, personal.personal_name, operational.operational_position, personal.personal_state_civil FROM personal INNER JOIN operational ON personal.personal_id=operational_personal_id WHERE CAST(personal.personal_ci AS TEXT) ILIKE '%{}%' OR personal.personal_name ILIKE '%{}%' OR personal.personal_surnames ILIKE '%{}%'", &param, &param, &param);

    match pool {
        Database::Sqlite(pool) => {
            let rows = sqlx::query(query).bind(param).fetch_all(pool).await?;
            let mut personals: Vec<PublicPersonal> = Vec::new();

            for personal in rows {
                let personal = PublicPersonal {
                    personal_id: personal.get("personal_id"),
                    personal_ci: personal.get("personal_ci"),
                    personal_surnames: personal.get("personal_surnames"),
                    personal_name: personal.get("personal_name"),
                    operational_position: personal.get("operational_position"),
                    personal_state_civil: personal.get("personal_state_civil"),
                };

                personals.push(personal);
            }

            Ok(personals)
        }
        Database::PostgreSQL(pool) => {
            let rows = sqlx::query(query).bind(param).fetch_all(pool).await?;
            let mut personals: Vec<PublicPersonal> = Vec::new();

            for personal in rows {
                let personal = PublicPersonal {
                    personal_id: personal.get("personal_id"),
                    personal_ci: personal.get("personal_ci"),
                    personal_surnames: personal.get("personal_surnames"),
                    personal_name: personal.get("personal_name"),
                    operational_position: personal.get("operational_position"),
                    personal_state_civil: personal.get("personal_state_civil"),
                };

                personals.push(personal);
            }

            Ok(personals)
        }
    }
}

pub async fn get_compressed_personal(
    pool: &Database,
    param: String,
) -> Result<Vec<CompressedPersonal>, sqlx::Error> {
    let query = &format!("SELECT personal.personal_id, personal.personal_ci, personal.personal_name, FROM personal WHERE CAST(personal.personal_ci AS TEXT) ILIKE '%{}%' OR personal.personal_name ILIKE '%{}%' OR personal.personal_surnames ILIKE '%{}%'", &param, &param, &param);

    match pool {
        Database::Sqlite(pool) => {
            let rows = sqlx::query(query).bind(param).fetch_all(pool).await?;
            let mut personals: Vec<CompressedPersonal> = Vec::new();

            for personal in rows {
                let personal = CompressedPersonal {
                    personal_id: personal.get("personal_id"),
                    personal_ci: personal.get("personal_ci"),
                    personal_name: personal.get("personal_name"),
                };

                personals.push(personal);
            }

            Ok(personals)
        }
        Database::PostgreSQL(pool) => {
            let rows = sqlx::query(query).bind(param).fetch_all(pool).await?;
            let mut personals: Vec<CompressedPersonal> = Vec::new();

            for personal in rows {
                let personal = CompressedPersonal {
                    personal_id: personal.get("personal_id"),
                    personal_ci: personal.get("personal_ci"),
                    personal_name: personal.get("personal_name"),
                };

                personals.push(personal);
            }

            Ok(personals)
        }
    }
}

pub async fn get_personal_by_id(pool: &Database, id: i32) -> Result<PersonalSQL, sqlx::Error> {
    let personal_query = r#"SELECT * FROM personal WHERE personal_id = $1"#;
    let trait_query = r#"SELECT * FROM traits WHERE trait_personal_id = $1"#;
    let fathers_query = r#"SELECT * FROM fathers WHERE fathers_personal_id = $1"#;
    let children_query = r#"SELECT * FROM children WHERE children_personal_id = $1"#;
    let relatives_query = r#"SELECT * FROM relatives WHERE relative_personal_id = $1"#;
    let education_query = r#"SELECT * FROM educations WHERE education_personal_id = $1"#;
    let professional_query = r#"SELECT * FROM professional WHERE professional_personal_id = $1"#;
    let labor_query = r#"SELECT * FROM labor WHERE labor_personal_id = $1"#;
    let health_query = r#"SELECT * FROM health WHERE health_personal_id = $1"#;
    let operational_query = r#"SELECT * FROM operational WHERE operational_personal_id = $1"#;
    let record_query = r#"SELECT * FROM records WHERE record_personal_id = $1"#;

    match pool {
        Database::Sqlite(pool) => {
            let personals = sqlx::query(personal_query).bind(id).fetch_one(pool).await?;
            let traits = sqlx::query(trait_query).bind(id).fetch_one(pool).await?;
            let fathers = sqlx::query(fathers_query).bind(id).fetch_one(pool).await?;
            let childrens = sqlx::query(children_query).bind(id).fetch_one(pool).await?;
            let relatives = sqlx::query(relatives_query)
                .bind(id)
                .fetch_one(pool)
                .await?;
            let educations = sqlx::query(education_query)
                .bind(id)
                .fetch_one(pool)
                .await?;
            let professionals = sqlx::query(professional_query)
                .bind(id)
                .fetch_one(pool)
                .await?;
            let labors = sqlx::query(labor_query).bind(id).fetch_one(pool).await?;
            let healths = sqlx::query(health_query).bind(id).fetch_one(pool).await?;
            let operationals = sqlx::query(operational_query)
                .bind(id)
                .fetch_one(pool)
                .await?;
            let records = sqlx::query(record_query)
                .bind(id)
                .fetch_optional(pool)
                .await?;

            Ok(PersonalSQL {
                operational_type: operationals.get("operational_type"),
                trait_others: traits.get("trait_others"),
                educational_photo: educations.get("educational_photo"),
                fathers_ci: fathers.get("fathers_ci"),
                fathers_name: fathers.get("fathers_name"),
                health_operations: healths.get("health_operations"),
                operational_start: operationals.get("operational_start"),
                personal_passport: personals.get("personal_passport"),
                fathers_surname: fathers.get("fathers_surname"),
                trait_skin: traits.get("trait_skin"),
                trait_hair_color: traits.get("trait_hair_color"),
                personal_passport_years_valid: personals.get("personal_passport_years_valid"),
                operational_end: operationals.get("operational_end"),
                personal_front_photo: personals.get("personal_front_photo"),
                records: if let Some(records) = records {
                    records.get("records")
                } else {
                    "".to_string()
                },
                personal_licenses: personals.get("personal_licenses"),
                personal_age: personals.get("personal_age"),
                personal_birthday: personals.get("personal_birthday"),
                educational_grade: educations.get("educational_grade"),
                personal_ci: personals.get("personal_ci"),
                trait_eyes_color: traits.get("trait_eyes_color"),
                trait_eyebrow_type: traits.get("trait_eyebrow_type"),
                operational_time: operationals.get("operational_time"),
                trait_face_type: traits.get("trait_face_type"),
                health_has_fractures: healths.get("health_has_fractures"),
                educational_institution: educations.get("educational_institution"),
                fathers_phone: fathers.get("fathers_phone"),
                trait_tattoos: traits.get("trait_tattoos"),
                trait_eyes_type: traits.get("trait_eyes_type"),
                health_fractures: healths.get("health_fractures"),
                operational_telephone: operationals.get("operational_telephone"),
                personal_account_bank: personals.get("personal_account_bank"),
                trait_hair_type: traits.get("trait_hair_type"),
                trait_build: traits.get("trait_build"),
                studies: professionals.get("studies"),
                personal_homeland_ci: personals.get("personal_homeland_ci"),
                personal_coordinates: personals.get("personal_coordinates"),
                personal_surnames: personals.get("personal_surnames"),
                personal_gender: personals.get("personal_gender"),
                personal_birthplace: personals.get("personal_birthplace"),
                personal_state_civil: personals.get("personal_state_civil"),
                trait_has_tattoos: traits.get("trait_has_tattoos"),
                personal_name: personals.get("personal_name"),
                trait_hands_type: traits.get("trait_hands_type"),
                operational_name: operationals.get("operational_name"),
                operational_file: operationals.get("operational_file"),
                personal_address: personals.get("personal_address"),
                fathers_age: fathers.get("fathers_age"),
                health_blood_group: healths.get("health_blood_group"),
                trait_nose_type: traits.get("trait_nose_type"),
                personal_passport_expiration: personals.get("personal_passport_expiration"),
                personal_back_photo: personals.get("personal_back_photo"),
                educational_end: educations.get("educational_end"),
                fathers_birthday: fathers.get("fathers_birthday"),
                health_allergies: healths.get("health_allergies"),
                labors: labors.get("labors"),
                trait_lips_type: traits.get("trait_lips_type"),
                trait_height: traits.get("trait_height"),
                childrens: childrens.get("childrens"),
                personal_phone: personals.get("personal_phone"),
                relatives: relatives.get("relatives"),
            })
        }
        Database::PostgreSQL(pool) => {
            let personals = sqlx::query(personal_query).bind(id).fetch_one(pool).await?;
            let traits = sqlx::query(trait_query).bind(id).fetch_one(pool).await?;
            let fathers = sqlx::query(fathers_query).bind(id).fetch_one(pool).await?;
            let childrens = sqlx::query(children_query)
                .bind(id)
                .fetch_optional(pool)
                .await?;
            let relatives = sqlx::query(relatives_query)
                .bind(id)
                .fetch_optional(pool)
                .await?;
            let educations = sqlx::query(education_query)
                .bind(id)
                .fetch_one(pool)
                .await?;
            let professionals = sqlx::query(professional_query)
                .bind(id)
                .fetch_optional(pool)
                .await?;
            let labors = sqlx::query(labor_query)
                .bind(id)
                .fetch_optional(pool)
                .await?;
            let healths = sqlx::query(health_query).bind(id).fetch_one(pool).await?;
            let operationals = sqlx::query(operational_query)
                .bind(id)
                .fetch_one(pool)
                .await?;
            let records = sqlx::query(record_query)
                .bind(id)
                .fetch_optional(pool)
                .await?;

            Ok(PersonalSQL {
                operational_type: operationals.get("operational_position"),
                trait_others: traits.get("trait_others"),
                educational_photo: bytea_to_string(educations.get("education_archive")),
                fathers_ci: fathers.get("fathers_ci"),
                fathers_name: fathers.get("fathers_name"),
                health_operations: healths.get("health_operations"),
                operational_start: operationals.get("operational_date_start"),
                personal_passport: personals.get("personal_passport"),
                fathers_surname: fathers.get("fathers_surname"),
                trait_skin: traits.get("trait_skin"),
                trait_hair_color: traits.get("trait_hair_color"),
                personal_passport_years_valid: personals.get("personal_passport_years_valid"),
                operational_end: operationals.get("operational_date_end"),
                personal_front_photo: bytea_to_string(personals.get("personal_front_photo")),
                records: if let Some(records) = records {
                    records.get("records")
                } else {
                    String::new()
                },
                personal_licenses: personals.get("personal_licenses"),
                personal_age: personals.get("personal_age"),
                personal_birthday: personals.get("personal_birthday"),
                educational_grade: educations.get("education_grade"),
                personal_ci: personals.get("personal_ci"),
                trait_eyes_color: traits.get("trait_eye_color"),
                trait_eyebrow_type: traits.get("trait_eyebrow_type"),
                // TODO: Implement face type on tables
                operational_time: operationals.get("operational_date_end"),
                // TODO: Implement face type on tables
                trait_face_type: traits.get("trait_hands_type"),
                health_has_fractures: healths.get("health_has_fractures"),
                educational_institution: educations.get("education_institution"),
                fathers_phone: fathers.get("fathers_phone"),
                trait_tattoos: Some(bytea_to_string(traits.get("trait_tattoos"))),
                trait_eyes_type: traits.get("trait_eye_shape"),
                health_fractures: healths.get("health_fractures_description"),
                operational_telephone: operationals.get("operational_phone"),
                personal_account_bank: personals.get("personal_bank_account"),
                trait_hair_type: traits.get("trait_hair_type"),
                trait_build: traits.get("trait_build"),
                studies: if let Some(professionals) = professionals {
                    professionals.get("studies")
                } else {
                    String::new()
                },
                personal_homeland_ci: personals.get("personal_homeland_ci"),
                personal_coordinates: personals.get("personal_coordinates"),
                personal_surnames: personals.get("personal_surnames"),
                personal_gender: personals.get("personal_gender"),
                personal_birthplace: personals.get("personal_birthplace"),
                personal_state_civil: personals.get("personal_state_civil"),
                trait_has_tattoos: traits.get("trait_has_tattoos"),
                personal_name: personals.get("personal_name"),
                trait_hands_type: traits.get("trait_hands_type"),
                operational_name: operationals.get("operational_organization_name"),
                operational_file: bytea_to_string(operationals.get("operational_image")),
                personal_address: personals.get("personal_address"),
                fathers_age: fathers.get("fathers_age"),
                health_blood_group: healths.get("health_blood_group"),
                trait_nose_type: traits.get("trait_nose_type"),
                personal_passport_expiration: personals.get("personal_passport_expiration"),
                personal_back_photo: bytea_to_string(personals.get("personal_back_photo")),
                educational_end: educations.get("education_date_end"),
                fathers_birthday: fathers.get("fathers_birthday"),
                health_allergies: healths.get("health_allergies"),
                labors: if let Some(labors) = labors {
                    labors.get("labors")
                } else {
                    String::new()
                },
                trait_lips_type: traits.get("trait_lips_type"),
                trait_height: traits.get("trait_height"),
                childrens: if let Some(childrens) = childrens {
                    childrens.get("childrens")
                } else {
                    String::new()
                },
                personal_phone: personals.get("personal_phone"),
                relatives: if let Some(relatives) = relatives {
                    relatives.get("childrens")
                } else {
                    String::new()
                },
            })
        }
    }
}

pub async fn delete_personal(id: i32, pool: &Database) -> Result<(), sqlx::Error> {
    let query = "SELECT delete_personal_records($1)";

    match pool {
        Database::PostgreSQL(pool) => {
            sqlx::query(query).bind(id).execute(pool).await?;
            Ok(())
        }
        Database::Sqlite(pool) => {
            sqlx::query(query).bind(id).execute(pool).await?;
            Ok(())
        }
    }
}
