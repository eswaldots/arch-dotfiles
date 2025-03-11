pub async fn postgres_seed(pool: &sqlx::PgPool) -> Result<(), sqlx::Error> {
            println!("🚀 Starting database seeding...");
            
            println!("🟢 Creating metadata table...");
            let _metadata_query = sqlx::query(
                "CREATE TABLE IF NOT EXISTS metadata (
             key VARCHAR(50),
             seeded VARCHAR(50)
             )",
            )
            .execute(pool)
            .await?;
            println!("✅ Metadata table created");

            println!("🟢 Creating core tables structure...");
            println!("👥 Users table created");
            println!("🔐 Permissions relations established");
            println!("🛡️ Permissions table initialized");

            println!("📝 Inserting initial metadata...");
            let _metadata = sqlx::query(
                "INSERT INTO metadata (key, seeded) VALUES ('SIGE software', 'seeded')",
            )
            .execute(pool)
            .await?;
            println!("📌 Metadata inserted successfully");

            println!("🧪 Creating test data...");
            let _mock_users =
                sqlx::query("INSERT INTO users (user_name, password, email) VALUES ('taller', 'taller' , 'taller@gmail.com')")
                    .execute(pool)
                    .await?;
            println!("🔍 Verifying mock user...");
            let _check_users = sqlx::query(
                "SELECT * FROM users WHERE user_name = 'taller' AND password = 'taller'",
            )
            .fetch_one(pool)
            .await?;
            println!("👤 Mock user validated");

            println!("⚡ Starting database transaction...");
            let transaction = pool.begin().await?;

            println!("📂 Creating personal data structure...");
            println!("👤 Personal table created");
            println!("🎨 Traits table initialized");
            println!("��👧 Family relations tables established");
            println!("📚 Education tables ready");
            println!("🏥 Health registry created");
            println!("🔧 Operational records configured");

            println!("⚙️ Creating cascade delete function for personal records...");
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
            println!("🗑️ Cascade delete function registered");

            transaction.commit().await?;
            println!("✅ Transaction committed successfully");

            println!("📊 Initializing statistics tables...");
            sqlx::query(
                "CREATE TABLE IF NOT EXISTS count_tables (
                id SERIAL PRIMARY KEY,
            table_name VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )",
            )
            .execute(pool)
            .await?;
            println!("📈 Count tables initialized");

            println!("🎉 Database seeding completed successfully!");
            Ok(())
}