pub async fn postgres_seed(pool: &sqlx::PgPool) -> Result<(), sqlx::Error> {
    println!("🚀 Starting database seeding process");

    println!("🔄 Starting personal-repein data tables transaction");
    let transaction = pool.begin().await?;

    sqlx::query("CREATE TABLE IF NOT EXISTS repein (
        repein_id SERIAL PRIMARY KEY,
        repein_name VARCHAR(255) NOT NULL,
        repein_description TEXT NOT NULL,
        repein_created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )")
    .execute(pool)
    .await?;

    println!("🎉 Database seeding completed successfully");
    Ok(())
}

pub async fn sqlite_seed(pool: &sqlx::SqlitePool) -> Result<(), sqlx::Error> {
    Ok(())
}