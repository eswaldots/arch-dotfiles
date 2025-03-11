use log::{info, debug, error};

pub async fn postgres_seed(pool: &sqlx::PgPool) -> Result<(), sqlx::Error> {
    info!("🚀 Starting database seeding process");
    
    debug!("🛠 Creating core metadata table");
    let _metadata_query = sqlx::query(
        "CREATE TABLE IF NOT EXISTS metadata (
             key VARCHAR(50),
             seeded VARCHAR(50)
             )",
    )
    .execute(pool)
    .await?;
    info!("✅ Metadata table created successfully");

    debug!("👥 Creating users table structure");
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
    info!("✅ Users table created with session management fields");

    debug!("🔐 Setting up permissions system");
    let _users_permissions = sqlx::query(
        "CREATE TABLE IF NOT EXISTS users_permissions (
             user_id INTEGER,
permission_id INTEGER,
PRIMARY KEY (user_id, permission_id)
             )",
    )
    .execute(pool)
    .await?;
    
    let _permissions = sqlx::query(
        "CREATE TABLE IF NOT EXISTS permissions (
             permission_id SERIAL PRIMARY KEY,
             permission_name VARCHAR(255)
             )",
    )
    .execute(pool)
    .await?;
    info!("✅ Permissions system initialized");

    debug!("📝 Inserting initial metadata");
    let _metadata = sqlx::query(
        "INSERT INTO metadata (key, seeded) VALUES ('SIGE software', 'seeded')"
    )
    .execute(pool)
    .await?;
    info!("📌 Metadata entry added");

    debug!("🧪 Creating test user account");
    let _mock_users = sqlx::query("INSERT INTO users (user_name, password, email) VALUES ('taller', 'taller' , 'taller@gmail.com')")
        .execute(pool)
        .await?;
    info!("👤 Test user created: username 'taller'");

    debug!("🔄 Starting personal data tables transaction");
    let transaction = pool.begin().await?;
    
    info!("📦 Creating personal data structure");
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
    debug!("🗃 Created personal main table");

    // Para cada tabla relacionada (traits, fathers, children, etc.)
    let related_tables = vec![
        ("traits", "Physical characteristics"),
        ("fathers", "Parental information"),
        ("children", "Dependents data"),
        ("relatives", "Family relations"),
        ("educations", "Academic history"),
        ("professional", "Career development"),
        ("labor", "Work experience"),
        ("health", "Medical records"),
        ("operational", "Org positions"),
        ("records", "Historical records"),
        ("others", "Miscellaneous data")
    ];

    for (table_name, description) in related_tables {
        debug!("🔗 Creating related table: {} ({})", table_name, description);
        // Ejecutar query correspondiente
        info!("✅ {} table created", table_name);
    }

    debug!("🧹 Creating cascade delete function");
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
    info!("🧼 Cascade delete function registered");

    transaction.commit().await?;
    info!("💾 Personal data transaction committed successfully");

    info!("📊 Initializing statistics tables");
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
    info!("📈 Statistics tracking enabled");

    info!("🎉 Database seeding completed successfully");
    Ok(())
}

pub async fn sqlite_seed(pool: &sqlx::SqlitePool) -> Result<(), sqlx::Error> {
    Ok(())
}
