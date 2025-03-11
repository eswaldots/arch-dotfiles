use std::sync::Arc;

use serde_json::{json, Error};
use sqlx::{postgres::PgRow, sqlite::SqliteRow, PgPool, Row};
use tauri::Wry;
use tauri_plugin_store::Store;

use crate::{
    definitions::{
        config_definitions::{CustomTable, DbConfig, EnterpriseConfig, GeneralConfig, SaveError},
        database_definitions::Database,
    },
    utils::{transfer_asset::transfer_asset, unwrap_safe_store::unwrap_safe_store},
};

pub fn get_general_config(store: Arc<Store<Wry>>) -> Result<GeneralConfig, Error> {
    let dark_mode = unwrap_safe_store(&store, "dark_mode").and_then(|v| v.as_bool());

    let report_directory = unwrap_safe_store(&store, "report_directory")
        .and_then(|v| v.as_str().map(|s| s.to_string()));

    let color_scheme =
        unwrap_safe_store(&store, "color_scheme").and_then(|v| v.as_str().map(|s| s.to_string()));

    let wallpaper =
        unwrap_safe_store(&store, "wallpaper").and_then(|v| v.as_str().map(|s| s.to_string()));

    Ok(GeneralConfig {
        dark_mode,
        report_directory,
        color_scheme,
        wallpaper,
    })
}

pub async fn save_general_config(
    store: Arc<Store<Wry>>,
    config: GeneralConfig,
    module: Option<&str>,
    app_dir: &str,
) -> Result<(), SaveError> {
    if let Some(path) = config.wallpaper {
        let new_path = format!("{}/{}_wallpaper.png", app_dir, module.unwrap_or_default());

        if let Err(e) = transfer_asset(&path, &new_path).await {
            println!("Error transferiendo imagen a directorio local: {}", e);

            return Err(SaveError::ImageError);
        }

        if let Some(module) = module {
            store.set(format!("{}_wallpaper", module), json!(new_path));
        }

        store.set("wallpaper", json!(new_path));
    }

    store.set("dark_mode", json!(config.dark_mode));
    store.set("report_directory", json!(config.report_directory));
    store.set("color_scheme", json!(config.color_scheme));

    Ok(())
}

pub fn get_enterprise_config(store: Arc<Store<Wry>>) -> Result<EnterpriseConfig, Error> {
    fn get_store_value(store: &Store<Wry>, key: &str) -> Option<String> {
        let value = store.get(key);

        if let Some(value) = value {
            if let Some(value) = value.as_str() {
                return Some(value.to_string());
            } else {
                return None;
            }
        } else {
            return None;
        }
    }

    Ok(EnterpriseConfig {
        enterprise_name: get_store_value(&store, "enterprise_name"),
        enterprise_rif: get_store_value(&store, "enterprise_rif"),
        enterprise_date: get_store_value(&store, "enterprise_date"),
        enterprise_zip: get_store_value(&store, "enterprise_zip"),
        enterprise_image_path: get_store_value(&store, "enterprise_image_path"),
        enterprise_address: get_store_value(&store, "enterprise_address"),
        enterprise_parrish: get_store_value(&store, "enterprise_parrish"),
        enterprise_municipality: get_store_value(&store, "enterprise_municipality"),
        enterprise_province: get_store_value(&store, "enterprise_province"),
        enterprise_telephone: get_store_value(&store, "enterprise_telephone"),
        enterprise_whatsapp: get_store_value(&store, "enterprise_whatsapp"),
        enterprise_email: get_store_value(&store, "enterprise_email"),
        enterprise_website: get_store_value(&store, "enterprise_website"),
    })
}

pub async fn save_enterprise_config(
    store: Arc<Store<Wry>>,
    config: EnterpriseConfig,
    app_dir: &str,
) -> Result<(), SaveError> {
    let image_path = &config.enterprise_image_path;
    let new_image_path = format!("{}/enterprise.png", app_dir);

    // Copy the image first
    if let Some(path) = image_path {
        if let Err(e) = tokio::fs::copy(path, &new_image_path).await {
            println!("Error copiando imagen a directorio local: {}", e);

            return Err(SaveError::ImageError);
        }
    }

    // Create a helper closure to save values
    let save_value = |key: &str, value: &Option<String>| {
        store.set(key, json!(value));
    };

    // Save all config values
    save_value("enterprise_name", &config.enterprise_name);
    save_value("enterprise_rif", &config.enterprise_rif);
    save_value("enterprise_image_path", &Some(new_image_path));
    save_value("enterprise_address", &config.enterprise_address);
    save_value("enterprise_parrish", &config.enterprise_parrish);
    save_value("enterprise_municipality", &config.enterprise_municipality);
    save_value("enterprise_province", &config.enterprise_province);
    save_value("enterprise_telephone", &config.enterprise_telephone);
    save_value("enterprise_whatsapp", &config.enterprise_whatsapp);
    save_value("enterprise_email", &config.enterprise_email);
    save_value("enterprise_website", &config.enterprise_website);

    Ok(())
}

pub fn get_db_config(store: Arc<Store<Wry>>, module: &str) -> DbConfig {
    println!("Getting db config for {}", module);

    let local_mode = unwrap_safe_store(&store, "local_mode").and_then(|v| v.as_bool());

    let key = |suffix: &str| format!("{}_{}", module, suffix);

    let db_port =
        unwrap_safe_store(&store, &key("db_port")).and_then(|v| v.as_str().map(|s| s.to_string()));

    let db_name =
        unwrap_safe_store(&store, &key("db_name")).and_then(|v| v.as_str().map(|s| s.to_string()));

    let db_user =
        unwrap_safe_store(&store, &key("db_user")).and_then(|v| v.as_str().map(|s| s.to_string()));

    let db_password = unwrap_safe_store(&store, &key("db_password"))
        .and_then(|v| v.as_str().map(|s| s.to_string()));

    let db_host =
        unwrap_safe_store(&store, &key("db_host")).and_then(|v| v.as_str().map(|s| s.to_string()));

    DbConfig {
        local_mode,
        db_port,
        db_name,
        db_host,
        db_user,
        db_password,
    }
}

pub fn save_db_config(
    store: Arc<Store<Wry>>,
    config: DbConfig,
    module: &str,
) -> Result<(), SaveError> {
    let key = |suffix: &str| format!("{}_{}", module, suffix);
    match config.local_mode {
        Some(true) => {
            store.set(key("local_mode"), config.local_mode);

            Ok(())
        }

        Some(false) => {
            store.set(key("local_mode"), false);
            store.set(key("db_port"), config.db_port);
            store.set(key("db_name"), config.db_name);
            store.set(key("db_user"), config.db_user);
            store.set(key("db_host"), config.db_host);
            store.set(key("db_password"), config.db_password);

            Ok(())
        }

        None => {
            store.set(key("local_mode"), false);
            store.set(key("db_port"), config.db_port);
            store.set(key("db_name"), config.db_name);
            store.set(key("db_user"), config.db_user);
            store.set(key("db_host"), config.db_host);
            store.set(key("db_password"), config.db_password);

            Ok(())
        }
    }
}

pub async fn check_database_direction(db_direction: &str) -> Result<(), sqlx::Error> {
    println!("Checking database direction: {db_direction}");
    let pool = PgPool::connect(db_direction).await?;

    println!("Checking database...");
    sqlx::query("SELECT 1").fetch_one(&pool).await?;

    println!("Database checked");

    Ok(())
}

pub async fn get_tables(pool: &Database) -> Result<Vec<String>, sqlx::Error> {
    match pool {
        Database::Sqlite(pool) => {
            let mut tables: Vec<String> = Vec::new();

            sqlx::query("SELECT table_name FROM count_tables")
                .map(|row: SqliteRow| {
                    let table = row.get::<String, _>("table_name");

                    tables.push(table);
                })
                .fetch_all(pool)
                .await?;

            println!("Tables: {:?}", &tables);

            Ok(tables)
        }
        Database::PostgreSQL(pool) => {
            let mut tables: Vec<String> = Vec::new();

            sqlx::query("SELECT table_name FROM count_tables")
                .map(|row: PgRow| {
                    let table = row.get::<String, _>("table_name");

                    tables.push(table);
                })
                .fetch_all(pool)
                .await?;

            println!("Tables: {:?}", &tables);

            Ok(tables)
        }
    }
}

pub async fn save_table(pool: &Database, table: CustomTable) -> Result<(), sqlx::Error> {
    println!("Building table");

    let mut create_table = sql_query_builder::CreateTable::new()
        .create_table(&format!("\"{}\"", &table.table_name))
        .column("Id SERIAL PRIMARY KEY");

    for field in &table.fields {
        create_table = create_table.column(&format!("\"{}\" TEXT", field))
    }

    let query = create_table.to_string();

    println!("Table builded: {:?}", query);

    match pool {
        Database::Sqlite(pool) => {
            sqlx::query(&query).execute(pool).await?;

            sqlx::query("INSERT INTO count_tables (table_name) VALUES ($1)")
                .bind(&table.table_name)
                .execute(pool)
                .await?;
        }
        Database::PostgreSQL(pool) => {
            sqlx::query(&query).execute(pool).await?;

            sqlx::query("INSERT INTO count_tables (table_name) VALUES ($1)")
                .bind(&table.table_name)
                .execute(pool)
                .await?;
        }
    }

    Ok(())
}

pub async fn update_table(pool: &Database, table: CustomTable) -> Result<(), sqlx::Error> {
    println!("Updating table");

    let mut update_table =
        sql_query_builder::AlterTable::new().alter_table(&format!("\"{}\"", &table.table_name));

    for field in &table.fields {
        update_table = update_table.rename(&format!("COLUMN \"{}\"", field))
    }

    let query = update_table.to_string();

    println!("Table updated: {:?}", query);

    match pool {
        Database::Sqlite(pool) => {
            sqlx::query(&query).execute(pool).await?;

            sqlx::query("INSERT INTO count_tables (table_name) VALUES ($1)")
                .bind(&table.table_name)
                .execute(pool)
                .await?;
        }
        Database::PostgreSQL(pool) => {
            sqlx::query(&query).execute(pool).await?;

            sqlx::query("INSERT INTO count_tables (table_name) VALUES ($1)")
                .bind(&table.table_name)
                .execute(pool)
                .await?;
        }
    }

    Ok(())
}
