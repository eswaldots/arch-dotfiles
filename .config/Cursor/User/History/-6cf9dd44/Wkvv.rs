use crate::{
    definitions::{analysis_definitions::{BoundingRequest, Children, PublicRepein, Records, Relative, RepeinJSON}, database_definitions::Database}, utils::{date_to_sql::date_to_sql, generate_random_id::generate_random_id, string_to_bool::string_to_bool, string_to_int::string_to_int},
};
use sqlx::Row;

pub async fn save_repein(repein: RepeinJSON, pool: &Database) -> Result<(), sqlx::Error> {
    println!("Saving repein");

    let id = generate_random_id(0, 10000);

    let personal_query = r"INSERT INTO repein (
        repein_id,
        personal_front_photo,
        personal_back_photo,
        personal_ci,
        personal_passport,
        personal_passport_expiration,
        personal_passport_years_valid,
        personal_name,
        personal_surnames,
        personal_nicknames,
        personal_birthday,
        personal_age,
        personal_birthplace,
        personal_address,
        personal_phone,
        personal_coordinates,
        personal_gender,
        personal_state_civil,
        personal_licenses,
        personal_homeland_ci,
        personal_account_bank
    ) VALUES (
        $1,
        $2,
        $3,
        $4,
        $5,
        $6,
        $7,
        $8,
        $9,
        $10,
        $11,
        $12,
        $13,
        $14,
        $15,
        $16,
        $17,
        $18,
        $19,
        $20,
        $21
    )";

    // Ejecutar la query de datos personales
    let traits_query = r"INSERT INTO repein_traits (
        repein_id,
        trait_build,
        trait_height,
        trait_skin,
        trait_has_tattoos,
        trait_tattoos,
        trait_has_scars,
        trait_scars,
        trait_eyes_color,
        trait_eyes_type,
        trait_hair_color,
        trait_hair_type,
        trait_eyebrow_type,
        trait_nose_type,
        trait_face_type,
        trait_lips_type,
        trait_hands_type,
        trait_others
    ) VALUES (
        $1,
        $2,
        $3,
        $4,
        $5,
        $6,
        $7,
        $8,
        $9,
        $10,
        $11,
        $12,
        $13,
        $14,
        $15,
        $16,
        $17,
        $18
    )";

        let relatives_query = r"INSERT INTO repein_relatives (
            repein_id,
            relative_name,
            relative_surnames,
            relative_birthday,
            relative_age,
            relative_grade,
            relative_phone
        ) VALUES (
            $1,
            $2,
            $3,
            $4,
            $5,
            $6,
            $7
        )";

        let childrens_query = r"INSERT INTO repein_childrens (
            repein_id,
            children_name,
            children_surnames,
            children_birthday,
            children_age,
            children_grade
        ) VALUES (
            $1,
            $2,
            $3,
            $4,
            $5,
            $6
        )";

    let records_query = r"INSERT INTO repein_records (
            repein_id,
            record_name,
            record_type,
        record_organism,  
        record_dependency,
        record_state,
        record_document,
        record_date,
        record_images
        ) VALUES (
            $1,
            $2,
            $3,
            $4,
            $5,
            $6,
            $7,
            $8,
            $9
        )";

    match pool {
        Database::PostgreSQL(pool) => {
            sqlx::query(personal_query)
                .bind(id)
                .bind(repein.personal_front_photo)
                .bind(repein.personal_back_photo)
                .bind(repein.personal_ci)
                .bind(repein.personal_passport)
                .bind(date_to_sql(&repein.personal_passport_expiration))
                .bind(string_to_int(&repein.personal_passport_years_valid).unwrap_or_default())
                .bind(repein.personal_name)
                .bind(repein.personal_surnames)
                .bind(repein.personal_nicknames)
                .bind(date_to_sql(&repein.personal_birthday))
                .bind(string_to_int(&repein.personal_age).unwrap_or_default())
                .bind(repein.personal_birthplace)
                .bind(repein.personal_address)
                .bind(repein.personal_phone)
                .bind(repein.personal_coordinates)
                .bind(repein.personal_gender)
                .bind(repein.personal_state_civil)
                .bind(repein.personal_licenses)
                .bind(repein.personal_homeland_ci)
                .bind(repein.personal_account_bank)
                .execute(pool)
                .await?;

            sqlx::query(traits_query)
                .bind(id)
                .bind(repein.trait_build)
                .bind(string_to_int(&repein.trait_height).unwrap_or_default())
                .bind(repein.trait_skin)
                .bind(string_to_bool(&repein.trait_has_tattoos).unwrap_or_default())
                .bind(repein.trait_tattoos)
                .bind(string_to_bool(&repein.trait_has_scars).unwrap_or_default())
                .bind(repein.trait_scars)
                .bind(repein.trait_eyes_color)
                .bind(repein.trait_eyes_type)
                .bind(repein.trait_hair_color)
                .bind(repein.trait_hair_type)
                .bind(repein.trait_eyebrow_type)
                .bind(repein.trait_nose_type)
                .bind(repein.trait_face_type)
                .bind(repein.trait_lips_type)
                .bind(repein.trait_hands_type)
                .bind(repein.trait_others)
                .execute(pool)
                .await?;

            if let Ok(relatives) = serde_json::from_str::<Vec<Relative>>(&repein.relatives) {
                for relative in relatives {
                    sqlx::query(relatives_query)
                        .bind(id)
                        .bind(relative.relative_name)
                        .bind(relative.relative_surname)
                        .bind(date_to_sql(&relative.relative_birthday))
                        .bind(string_to_int(&relative.relative_age).unwrap_or_default())
                        .bind(relative.relative_grade)
                        .bind(relative.relative_phone)
                        .execute(pool)
                        .await?;
                }
            }

            if let Ok(childrens) = serde_json::from_str::<Vec<Children>>(&repein.childrens) {
                for child in childrens {
                    sqlx::query(childrens_query)
                        .bind(id)
                        .bind(child.children_name)
                        .bind(child.children_surnames)
                        .bind(date_to_sql(&child.children_birthday))
                        .bind(string_to_int(&child.children_age).unwrap_or_default())
                        .bind(child.children_grade)
                        .execute(pool)
                        .await?;
                }
            }

            if let Ok(records) = serde_json::from_str::<Vec<Records>>(&repein.records) {
                for record in records {
                    sqlx::query(records_query)
                        .bind(id)
                        .bind(record.record_name)
                        .bind(record.record_type)
                        .bind(record.record_organism)
                        .bind(record.record_dependency)
                        .bind(record.record_state)
                        .bind(record.record_document)
                        .bind(date_to_sql(&record.record_date))
                        .bind(record.record_images)
                        .execute(pool)
                        .await?;
                }
            }

            else {
                if let Err(e) = serde_json::from_str::<Vec<Records>>(&repein.records) {
                    println!("Error parsing records: {}", e);

                    println!("Records: {}", repein.records);
                }
            }

        }
        Database::Sqlite(pool) => {
            sqlx::query(personal_query)
                .bind(id)
                .bind(repein.personal_front_photo)
                .bind(repein.personal_back_photo)
                .bind(repein.personal_ci)
                .bind(repein.personal_passport)
                .bind(date_to_sql(&repein.personal_passport_expiration))
                .bind(string_to_int(&repein.personal_passport_years_valid).unwrap_or_default())
                .bind(repein.personal_name)
                .bind(repein.personal_surnames)
                .bind(repein.personal_nicknames)
                .bind(date_to_sql(&repein.personal_birthday))
                .bind(string_to_int(&repein.personal_age).unwrap_or_default())
                .bind(repein.personal_birthplace)
                .bind(repein.personal_address)
                .bind(repein.personal_phone)
                .bind(repein.personal_coordinates)
                .bind(repein.personal_gender)
                .bind(repein.personal_state_civil)
                .bind(repein.personal_licenses)
                .bind(repein.personal_homeland_ci)
                .bind(repein.personal_account_bank)
                .execute(pool)
                .await?;
        }
    }

    Ok(())
}

pub async fn get_public_repein(pool: &Database) -> Result<Vec<PublicRepein>, sqlx::Error> {
    println!("Getting public repein");

    let query  = r"SELECT repein_id, personal_ci, personal_age, personal_state_civil, personal_age, personal_gender, personal_name, personal_surnames, personal_nicknames FROM repein
";

match pool {
    Database::PostgreSQL(pool) => {
        let mut repeins: Vec<PublicRepein> = Vec::new();

        let rows = sqlx::query(query).fetch_all(pool).await?;

        println!("Public repein getted");

        for repein in rows {
            let repein = PublicRepein {
                repein_id: repein.get("repein_id"),
                repein_ci: repein.get("personal_ci"),
                repein_age: repein.get("personal_age"),
                repein_state_civil: repein.get("personal_state_civil"),
                repein_gender: repein.get("personal_gender"),
                repein_name: repein.get("personal_name"),
                repein_surnames: repein.get("personal_surnames"),
                repein_nicknames: repein.get("personal_nicknames")
            };

            repeins.push(repein)
        }

        Ok(repeins)
    }

    Database::Sqlite(pool) => {
        let mut repeins: Vec<PublicRepein> = Vec::new();

        let rows = sqlx::query(query).fetch_all(pool).await?;

        for repein in rows {
            let repein = PublicRepein {
                repein_id: repein.get("repein_id"),
                repein_ci: repein.get("personal_ci"),
                repein_age: repein.get("personal_age"),
                repein_state_civil: repein.get("personal_state_civil"),
                repein_gender: repein.get("personal_gender"),
                repein_name: repein.get("personal_name"),
                repein_surnames: repein.get("personal_surnames"),
                repein_nicknames: repein.get("personal_nicknames")
            };

            repeins.push(repein)
        }

        Ok(repeins)
    }

}
}

pub async fn get_repein_records_by_id(pool: &Database, repein_id: i32  ) -> Result<Vec<Records>, sqlx::Error> {
    println!("Getting repein records by id");

    let query = r"SELECT record_id, record_name, record_type, record_organism, record_dependency, record_state, record_document, CAST(record_date AS TEXT) AS record_date, record_images FROM repein_records WHERE repein_id = $1";
    
    match pool {
        Database::PostgreSQL(pool) => {
            let mut repein_records: Vec<Records> = Vec::new();

            let rows = sqlx::query(query).bind(repein_id).fetch_all(pool).await?;

            for row in rows {
                let record = Records {
                    id: row.get("record_id"),
                    record_name: row.get("record_name"),
                    record_type: row.get("record_type"),
                    record_organism: row.get("record_organism"),
                    record_dependency: row.get("record_dependency"),
                    record_state: row.get("record_state"),
                    record_document: row.get("record_document"),
                    record_date: row.get("record_date"),
                    record_images: row.get("record_images"),
                };

                repein_records.push(record);
            }

            Ok(repein_records)
        } 

        Database::Sqlite(pool) => {
            let mut repein_records: Vec<Records> = Vec::new();

            let rows = sqlx::query(query).bind(repein_id).fetch_all(pool).await?;

            for row in rows {
                let record = Records {
                    id: row.get("record_id"),
                    record_name: row.get("record_name"),
                    record_type: row.get("record_type"),
                    record_organism: row.get("record_organism"),
                    record_dependency: row.get("record_dependency"),
                    record_state: row.get("record_state"),
                    record_document: row.get("record_document"),
                    record_date: row.get("record_date"),
                    record_images: row.get("record_images"),
                };

                repein_records.push(record);
            }

            Ok(repein_records)
        }
    }    
}

pub async fn save_bounding(pool: &Database, bounding_request: BoundingRequest) -> Result<String, sqlx::Error> {
    println!("Saving bounding");

    let bounding_query = r"INSERT INTO bounding (
        repein_id,
        band_id
    ) VALUES (
        $1, $2
    )";

    let bounding_band_query = r"INSERT INTO bounding_band (
        bounding_id,
        bounding_type,
        organization_id,
        document_id,
        reason,
        date,
        has_procedure,
        procedure_description) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8
    )";

    let repein_records_query = r"INSERT INTO repein_records (
        repein_id,
        record_name,
        record_type,
        record_organism,
        record_dependency,
        record_state,
        record_document,
        record_date,
        record_images
    ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9
    )";

    match pool {
        Database::PostgreSQL(pool) => {
            sqlx::query(bounding_query)
                .bind(bounding_request.repein_id)
                .bind(bounding_request.band_id)
                .execute(pool)
                .await?;

            let bounding_id = sqlx::query("lastval()").fetch_one(pool).await?;

            for band in bounding_request.bounding_band {
                sqlx::query(bounding_band_query)
                    .bind(bounding_id)
                    .bind(band.bounding_type)
                    .bind(band.organization_id)
                    .bind(band.document_id)
                    .bind(band.reason)
                    .bind(band.date)
                    .bind(band.has_procedure)
                    .bind(band.procedure_description)
                    .execute(pool)
                    .await?;
            }

            for record in bounding_request.repein_records {
                sqlx::query(repein_records_query)
                    .bind(bounding_request.repein_id)
                    .bind(record.record_name)
                    .bind(record.record_type)
                    .bind(record.record_organism)
                    .bind(record.record_dependency)
                    .bind(record.record_state)
                    .bind(record.record_document)
                    .bind(record.record_date)
                    .bind(record.record_images)
                    .execute(pool)
                    .await?;
            }

            Ok(bounding_id)
        }

        Database::Sqlite(pool) => {
            sqlx::query(bounding_query)
                .bind(bounding_request.repein_id)
                .bind(bounding_request.band_id)
                .execute(pool)
                .await?;

            for band in bounding_request.bounding_band {
                sqlx::query(bounding_band_query)
                    .bind(bounding_request.repein_id)
                    .bind(band.bounding_type)
                    .bind(band.organization_id)
                    .bind(band.document_id)
                    .bind(band.reason)
                    .bind(band.date)
                    .bind(band.has_procedure)
                    .bind(band.procedure_description)
                    .execute(pool)
                    .await?;
            }

            for record in bounding_request.repein_records {
                sqlx::query(repein_records_query)
                    .bind(bounding_request.repein_id)
                    .bind(record.record_name)
                    .bind(record.record_type)
                    .bind(record.record_organism)
                    .bind(record.record_dependency)
                    .bind(record.record_state)
                    .bind(record.record_document)
                    .bind(record.record_date)
                    .bind(record.record_images)
                    .execute(pool)
                    .await?;
            }

            Ok(bounding_id)
        }
    }
}