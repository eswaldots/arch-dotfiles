use crate::definitions::database_definitions::Database;

pub async fn postgres_seed(pool: &sqlx::PgPool) -> Result<(), sqlx::Error> {
            println!("Creating metadata");
            let _metadata_query = sqlx::query(
                "CREATE TABLE IF NOT EXISTS metadata (
             key VARCHAR(50),
             seeded VARCHAR(50)
             )",
            )
            .execute(pool)
            .await?;

            println!("Creating users");
            let _users_query = sqlx::query(
                "CREATE TABLE IF NOT EXISTS users (
             user_id SERIAL PRIMARY KEY,
             user_name VARCHAR(255) NOT NULL,
             password VARCHAR(255) NOT NULL,
session_id VARCHAR(255),
session_expires_at TIMESTAMP,
email VARCHAR(255) NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
             )",
            )
            .execute(pool)
            .await?;

            println!("Creating permissions relations");
            let _users_permissions = sqlx::query(
                "CREATE TABLE IF NOT EXISTS users_permissions (
             user_id INTEGER,
permission_id INTEGER,
PRIMARY KEY (user_id, permission_id)
             )",
            )
            .execute(pool)
            .await?;

            println!("Creating permission");
            let _permissions = sqlx::query(
                "CREATE TABLE IF NOT EXISTS permissions (
             permission_id SERIAL PRIMARY KEY,
             permission_name VARCHAR(255)
             )",
            )
            .execute(pool)
            .await?;

            println!("Inserting metadata table");

            let _metadata = sqlx::query(
                "INSERT INTO metadata (key, seeded) VALUES ('SIGE software', 'seeded')",
            )
            .execute(pool)
            .await?;

            println!("Creating mock users");

            let _mock_users =
                sqlx::query("INSERT INTO users (user_name, password, email) VALUES ('taller', 'taller' , 'taller@gmail.com')")
                    .execute(pool)
                    .await?;

            println!("Checking mock users");
            let _check_users = sqlx::query(
                "SELECT * FROM users WHERE user_name = 'taller' AND password = 'taller'",
            )
            .fetch_one(pool)
            .await?;

            sqlx::query(
                "CREATE TABLE IF NOT EXISTS count_tables (
                table_id SERIAL PRIMARY KEY,
            table_name VARCHAR(255) NOT NULL,
            count INTEGER NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )",
            )
            .execute(pool)
            .await?;

            println!("Creating personal tables");

            let transaction = pool.begin().await?;

            let _personals = sqlx::query(
                "CREATE TABLE IF NOT EXISTS personal (
                personal_id SERIAL PRIMARY KEY,
                personal_ci INTEGER NOT NULL,
                personal_passport VARCHAR(50) NOT NULL,
                personal_passport_expiration TEXT NOT NULL,
                personal_passport_years_valid INTEGER NOT NULL,
                personal_name VARCHAR(100) NOT NULL,
                personal_surnames VARCHAR(100) NOT NULL,
                personal_birthday TEXT NOT NULL,
                personal_gender VARCHAR(10) NOT NULL,
                personal_state_civil VARCHAR(20),
                personal_birthplace VARCHAR(50),
                personal_age INTEGER,
                personal_phone VARCHAR(50),
                personal_address TEXT,
                personal_coordinates TEXT,
                personal_licenses TEXT,
                personal_front_photo BYTEA NOT NULL,
                personal_back_photo BYTEA NOT NULL,
                personal_homeland_ci INTEGER NOT NULL,
                personal_bank_account VARCHAR(50)
            )",
            )
            .execute(pool)
            .await?;

            let _traits = sqlx::query(
                "CREATE TABLE IF NOT EXISTS traits (
                trait_id SERIAL PRIMARY KEY,
                trait_personal_id INTEGER REFERENCES personal(personal_id) ON DELETE CASCADE,
                trait_build VARCHAR(100) NOT NULL,
                trait_height INTEGER NOT NULL,
                trait_skin VARCHAR(100) NOT NULL,
                trait_has_tattoos BOOLEAN NOT NULL,
                trait_tattoos BYTEA,
                trait_hair_color VARCHAR(100) NOT NULL,
                trait_hair_type VARCHAR(100) NOT NULL,
                trait_eye_color VARCHAR(100) NOT NULL,
                trait_eye_shape VARCHAR(100) NOT NULL,
                trait_eyebrow_type VARCHAR(100) NOT NULL,
                trait_nose_type VARCHAR(100) NOT NULL,
                trait_lips_type VARCHAR(100) NOT NULL,
                trait_hands_type VARCHAR(100) NOT NULL,
                trait_others TEXT
            )",
            )
            .execute(pool)
            .await?;

            let _fathers = sqlx::query(
                "CREATE TABLE IF NOT EXISTS fathers (
                fathers_id SERIAL PRIMARY KEY,
                fathers_personal_id INTEGER REFERENCES personal(personal_id) ON DELETE CASCADE,
                fathers_name VARCHAR(100) NOT NULL,
                fathers_surname VARCHAR(100) NOT NULL,
                fathers_ci VARCHAR(50) NOT NULL,
                fathers_birthday TEXT NOT NULL,
                fathers_age INTEGER NOT NULL,
                fathers_phone VARCHAR(50)
            )",
            )
            .execute(pool)
            .await?;

            let _children = sqlx::query(
                "CREATE TABLE IF NOT EXISTS children (
                children_id SERIAL PRIMARY KEY,
                children_personal_id INTEGER REFERENCES personal(personal_id) ON DELETE CASCADE,
                children_name VARCHAR(100) NOT NULL,
                children_surname VARCHAR(100) NOT NULL,
                children_birthday TEXT NOT NULL,
                children_age INTEGER NOT NULL,
                children_grade VARCHAR(50)
            )",
            )
            .execute(pool)
            .await?;

            let _relatives = sqlx::query(
                "CREATE TABLE IF NOT EXISTS relatives (
                relative_id SERIAL PRIMARY KEY,
                relative_personal_id INTEGER REFERENCES personal(personal_id) ON DELETE CASCADE,
                relative_relationship VARCHAR(50) NOT NULL,
                relative_name VARCHAR(100) NOT NULL,
                relative_surname VARCHAR(100) NOT NULL,
                relative_birthday TEXT NOT NULL,
                relative_age INTEGER NOT NULL,
                relative_grade VARCHAR(50),
                relative_phone VARCHAR(50),
                relative_address TEXT
            )",
            )
            .execute(pool)
            .await?;

            let _educations = sqlx::query(
                "CREATE TABLE IF NOT EXISTS educations (
                education_id SERIAL PRIMARY KEY,
                education_personal_id INTEGER REFERENCES personal(personal_id) ON DELETE CASCADE,
                education_grade VARCHAR(50) NOT NULL,
                education_institution VARCHAR(100) NOT NULL,
                education_date_end TEXT,
                education_archive BYTEA
            )",
            )
            .execute(pool)
            .await?;

            let _professional = sqlx::query(
                "CREATE TABLE IF NOT EXISTS professional (
                professional_id SERIAL PRIMARY KEY,
                professional_personal_id INTEGER REFERENCES personal(personal_id) ON DELETE CASCADE,
                professional_course_name VARCHAR(100) NOT NULL,
                professional_institution VARCHAR(100) NOT NULL,
                professional_date TEXT NOT NULL
            )",
            )
            .execute(pool)
            .await?;

            let _labor = sqlx::query(
                "CREATE TABLE IF NOT EXISTS labor (
                labor_id SERIAL PRIMARY KEY,
                labor_personal_id INTEGER REFERENCES personal(personal_id) ON DELETE CASCADE,
                labor_name VARCHAR(100) NOT NULL,
                labor_phone VARCHAR(50) NOT NULL,
                labor_boss VARCHAR(100) NOT NULL,
                labor_date_start TEXT NOT NULL,
                labor_date_end TEXT
            )",
            )
            .execute(pool)
            .await?;

            let _health = sqlx::query(
                "CREATE TABLE IF NOT EXISTS health (
                health_id SERIAL PRIMARY KEY,
                health_personal_id INTEGER REFERENCES personal(personal_id) ON DELETE CASCADE,
                health_blood_group VARCHAR(10) NOT NULL,
                health_allergies TEXT,
                health_operations TEXT,
                health_has_fractures BOOLEAN NOT NULL,
                health_fractures_description TEXT,
                health_notes TEXT
            )",
            )
            .execute(pool)
            .await?;

            let _operational = sqlx::query(
                "CREATE TABLE IF NOT EXISTS operational (
                operational_id SERIAL PRIMARY KEY,
                operational_personal_id INTEGER REFERENCES personal(personal_id) ON DELETE CASCADE,
                operational_organization_name VARCHAR(100) NOT NULL,
                operational_position VARCHAR(100) NOT NULL,
                operational_date_start TEXT NOT NULL,
                operational_date_end TEXT,
                operational_phone VARCHAR(50) NOT NULL,
                operational_image BYTEA
            )",
            )
            .execute(pool)
            .await?;

            let _records = sqlx::query(
                "CREATE TABLE IF NOT EXISTS records (
                record_id SERIAL PRIMARY KEY,
                record_personal_id INTEGER REFERENCES personal(personal_id) ON DELETE CASCADE,
                record_name VARCHAR(100) NOT NULL,
                record_type VARCHAR(50) CHECK (record_type IN ('admonition', 'course'))
            )",
            )
            .execute(pool)
            .await?;

            let _others = sqlx::query(
                "CREATE TABLE IF NOT EXISTS others (
                others_id SERIAL PRIMARY KEY,
                others_personal_id INTEGER REFERENCES personal(personal_id) ON DELETE CASCADE,
                others_description TEXT
            )",
            )
            .execute(pool)
            .await?;

            // Create delete function for personal records
            let _delete_function = sqlx::query(
                "CREATE OR REPLACE FUNCTION delete_personal_records(p_id INTEGER) RETURNS VOID AS $$
                BEGIN
                    DELETE FROM traits WHERE trait_personal_id = p_id;
                    DELETE FROM fathers WHERE fathers_personal_id = p_id;
                    DELETE FROM children WHERE children_personal_id = p_id;
                    DELETE FROM relatives WHERE relative_personal_id = p_id;
                    DELETE FROM educations WHERE education_personal_id = p_id;
                    DELETE FROM professional WHERE professional_personal_id = p_id;
                    DELETE FROM labor WHERE labor_personal_id = p_id;
                    DELETE FROM health WHERE health_personal_id = p_id;
                    DELETE FROM operational WHERE operational_personal_id = p_id;
                    DELETE FROM records WHERE record_personal_id = p_id;
                    DELETE FROM others WHERE others_personal_id = p_id;
                    DELETE FROM personal WHERE personal_id = p_id;
                END;
                $$ LANGUAGE plpgsql;"
            )
            .execute(pool)
            .await?;

            transaction.commit().await?;

            println!("Seeded database...");

            println!("Creating custom table for count tables...");

            sqlx::query(
                "CREATE TABLE IF NOT EXISTS count_tables (
                id SERIAL PRIMARY KEY,
            table_name VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )",
            )
            .execute(pool)
            .await?;

            Ok(())
}