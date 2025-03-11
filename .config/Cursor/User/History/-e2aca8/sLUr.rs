pub async fn postgres_seed(pool: &sqlx::PgPool) -> Result<(), sqlx::Error> {
    println!("🚀 Starting database seeding process");

    println!("🔄 Starting personal-repein data tables transaction");
    let transaction = pool.begin().await?;

    sqlx::query("CREATE TABLE IF NOT EXISTS repein (
        repein_id SERIAL PRIMARY KEY,
        personal_front_photo TEXT NOT NULL,
        personal_back_photo TEXT NOT NULL,
        personal_ci VARCHAR(20) NOT NULL,
        personal_passport VARCHAR(20) NOT NULL,
        personal_passport_expiration DATE NOT NULL,
        personal_passport_years_valid INTEGER NOT NULL,
        personal_name VARCHAR(255) NOT NULL,
        personal_surnames VARCHAR(255) NOT NULL,
        personal_nicknames VARCHAR(255),
        personal_birthday DATE NOT NULL,
        personal_age INTEGER NOT NULL,
        personal_birthplace VARCHAR(255) NOT NULL,
        personal_address TEXT NOT NULL,
        personal_phone VARCHAR(20) NOT NULL,
        personal_coordinates VARCHAR(100) NOT NULL,
        personal_gender VARCHAR(10) NOT NULL,
        personal_state_civil VARCHAR(20) NOT NULL,
        personal_licenses VARCHAR(50) NOT NULL,
        personal_homeland_ci VARCHAR(20) NOT NULL,
        personal_account_bank VARCHAR(30) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )")
    .execute(pool)
    .await?;

    sqlx::query("CREATE TABLE IF NOT EXISTS repein_traits (
        trait_id SERIAL PRIMARY KEY,
        repein_id INTEGER REFERENCES repein(repein_id),
        trait_build VARCHAR(20) NOT NULL,
        trait_height INTEGER NOT NULL,
        trait_skin VARCHAR(7) NOT NULL,
        trait_has_tattoos BOOLEAN NOT NULL DEFAULT false,
        trait_tattoos TEXT,
        trait_has_scars BOOLEAN NOT NULL DEFAULT false,
        trait_scars TEXT,
        trait_eyes_color VARCHAR(7) NOT NULL,
        trait_eyes_type VARCHAR(20) NOT NULL,
        trait_hair_color VARCHAR(7) NOT NULL,
        trait_hair_type VARCHAR(20) NOT NULL,
        trait_eyebrow_type VARCHAR(20) NOT NULL,
        trait_nose_type VARCHAR(20) NOT NULL,
        trait_face_type VARCHAR(20) NOT NULL,
        trait_lips_type VARCHAR(20) NOT NULL,
        trait_hands_type VARCHAR(20) NOT NULL,
        trait_others TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )")
    .execute(pool)
    .await?;

    println!("🎉 Database seeding completed successfully");
    Ok(())
}

pub async fn sqlite_seed(pool: &sqlx::SqlitePool) -> Result<(), sqlx::Error> {
    Ok(())
}