pub async fn postgres_seed(pool: &sqlx::PgPool) -> Result<(), sqlx::Error> {
    println!("🚀 Starting database seeding process");

    println!("🔄 Starting personal-repein data tables transaction");
    let transaction = pool.begin().await?;

    sqlx::query("CREATE TABLE IF NOT EXISTS repein (
        repein_id SERIAL PRIMARY KEY,
        personal_front_photo TEXT NOT NULL,
        personal_back_photo TEXT NOT NULL,
        personal_ci VARCHAR(20) UNIQUE NOT NULL,
        personal_passport VARCHAR(20) UNIQUE NOT NULL,
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
        trait_skin VARCHAR(255) NOT NULL,
        trait_has_tattoos BOOLEAN NOT NULL DEFAULT false,
        trait_tattoos TEXT,
        trait_has_scars BOOLEAN NOT NULL DEFAULT false,
        trait_scars TEXT,
        trait_eyes_color VARCHAR(255) NOT NULL,
        trait_eyes_type VARCHAR(20) NOT NULL,
        trait_hair_color VARCHAR(255) NOT NULL,
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

    sqlx::query("CREATE TABLE IF NOT EXISTS repein_relatives (
        relative_id SERIAL PRIMARY KEY,
        repein_id INTEGER REFERENCES repein(repein_id),
        relative_name VARCHAR(255) NOT NULL,
        relative_surnames VARCHAR(255) NOT NULL,
        relative_birthday DATE NOT NULL,
        relative_age INTEGER NOT NULL,
        relative_grade VARCHAR(20) NOT NULL,
        relative_phone VARCHAR(20) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )")
    .execute(pool)
    .await?;

    sqlx::query("CREATE TABLE IF NOT EXISTS repein_childrens (
        children_id SERIAL PRIMARY KEY,
        repein_id INTEGER REFERENCES repein(repein_id),
        children_name VARCHAR(255) NOT NULL,
        children_surnames VARCHAR(255) NOT NULL,
        children_birthday DATE NOT NULL,
        children_age INTEGER NOT NULL,
        children_grade VARCHAR(20) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )").execute(pool).await?;

    sqlx::query("CREATE TABLE IF NOT EXISTS repein_records (
        record_id SERIAL PRIMARY KEY,
        repein_id INTEGER REFERENCES repein(repein_id),
        record_name VARCHAR(255) NOT NULL,
        record_type VARCHAR(20) NOT NULL,
        record_organism VARCHAR(20) NOT NULL,  
        record_dependency VARCHAR(20) NOT NULL,
        record_state VARCHAR(20) NOT NULL,
        record_document VARCHAR(30) NOT NULL,
        record_date DATE NOT NULL,
        record_images TEXT NOT NULL,
        record_role VARCHAR(20),
        record_interpol VARCHAR(20),
        record_siipol TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )")
    .execute(pool)
    .await?;

    sqlx::query("CREATE TABLE IF NOT EXISTS bounding (
        bounding_id SERIAL PRIMARY KEY,
        repein_id INTEGER REFERENCES repein(repein_id),
        band_id INTEGER REFERENCES bandas(id),

        status VARCHAR(20),

        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) 
    ").execute(pool).await?;

    sqlx::query("CREATE TABLE IF NOT EXISTS bounding_band (
        bounding_band_id SERIAL PRIMARY KEY,
        bounding_id INTEGER REFERENCES bounding(bounding_id),
        
        bounding_type VARCHAR(20) NOT NULL,
        organization_id INTEGER NOT NULL,
        document_id TEXT NOT NULL,

        reason TEXT,
        date TEXT,

        has_procedure BOOLEAN NOT NULL DEFAULT false,
        procedure_description TEXT
    )").execute(pool).await?;

    sqlx::query("CREATE TABLE IF NOT EXISTS update
    (
        update_id SERIAL PRIMARY KEY
        bounding_id INTEGER REFERENCES bounding(bounding_id),

        status TEXT NOT NULL,
        date DATE NOT NULL,
        verifier_phone TEXT,
        verifier_name TEXT,

        observations TEXT
    ) 
    ").execute(pool).await?;

    println!("🎉 Database seeding completed successfully");
    Ok(())
}

pub async fn sqlite_seed(pool: &sqlx::SqlitePool) -> Result<(), sqlx::Error> {
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
        trait_skin VARCHAR(255) NOT NULL,
        trait_has_tattoos BOOLEAN NOT NULL DEFAULT false,
        trait_tattoos TEXT,
        trait_has_scars BOOLEAN NOT NULL DEFAULT false,
        trait_scars TEXT,
        trait_eyes_color VARCHAR(255) NOT NULL,
        trait_eyes_type VARCHAR(20) NOT NULL,
        trait_hair_color VARCHAR(255) NOT NULL,
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

    sqlx::query("CREATE TABLE IF NOT EXISTS repein_relatives (
        relative_id SERIAL PRIMARY KEY,
        repein_id INTEGER REFERENCES repein(repein_id),
        relative_name VARCHAR(255) NOT NULL,
        relative_surnames VARCHAR(255) NOT NULL,
        relative_birthday DATE NOT NULL,
        relative_age INTEGER NOT NULL,
        relative_grade VARCHAR(20) NOT NULL,
        relative_phone VARCHAR(20) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )")
    .execute(pool)
    .await?;

    sqlx::query("CREATE TABLE IF NOT EXISTS repein_childrens (
        children_id SERIAL PRIMARY KEY,
        repein_id INTEGER REFERENCES repein(repein_id),
        children_name VARCHAR(255) NOT NULL,
        children_surnames VARCHAR(255) NOT NULL,
        children_birthday DATE NOT NULL,
        children_age INTEGER NOT NULL,
        children_grade VARCHAR(20) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )").execute(pool).await?;

    sqlx::query("CREATE TABLE IF NOT EXISTS repein_records (
        record_id SERIAL PRIMARY KEY,
        repein_id INTEGER REFERENCES repein(repein_id),
        record_name VARCHAR(255) NOT NULL,
        record_type VARCHAR(20) NOT NULL,
        record_organism VARCHAR(20) NOT NULL,  
        record_dependency VARCHAR(20) NOT NULL,
        record_state VARCHAR(20) NOT NULL,
        record_document VARCHAR(20) NOT NULL,
        record_date DATE NOT NULL,
        record_images TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )")
    .execute(pool)
    .await?;

    sqlx::query("CREATE TABLE IF NOT EXISTS bounding (
        bounding_id SERIAL PRIMARY KEY,
        repein_id INTEGER REFERENCES repein(repein_id),
        band_id INTEGER REFERENCES bandas(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )").execute(pool).await?;

    sqlx::query("CREATE TABLE IF NOT EXISTS bounding_band (
        bounding_band_id SERIAL PRIMARY KEY,
        bounding_id INTEGER REFERENCES bounding(bounding_id),
        
        bounding_type VARCHAR(20) NOT NULL,
        organization_id INTEGER NOT NULL,
        document_id TEXT NOT NULL,

        reason TEXT,
        date TEXT,

        has_procedure BOOLEAN NOT NULL DEFAULT false,
        procedure_description TEXT
    )").execute(pool).await?;

    println!("🎉 Database seeding completed successfully");

    Ok(())
}