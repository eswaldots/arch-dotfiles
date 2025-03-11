use core::panic;

use crate::definitions::app_definitions::AppState;
use crate::definitions::app_definitions::Module;
use crate::definitions::database_definitions::Database;
use crate::definitions::database_definitions::Metadata;
use crate::definitions::error_definitions::DatabaseError;
use crate::seeds;
use crate::utils::generate_db_direction::generate_db_direction;
use crate::utils::unwrap_safe_store::unwrap_safe_store;
use sqlx::{Error, PgPool, Row, SqlitePool};
use tauri::AppHandle;
use tauri::{App, Manager};
use tauri_plugin_store::StoreExt;
use tokio::sync::Mutex;

async fn seed(app: &AppHandle, pool: &Database) -> Result<(), sqlx::Error> {
    println!("Seeding database");

    match pool {
        Database::Sqlite(pool) => {
            seeds::personal_seed::sqlite_seed(pool).await?;

            Ok(())
        }
        Database::PostgreSQL(pool) => {
            println!("Seeding personal module database");

            seeds::personal_seed::postgres_seed(pool).await?;

            println!("Seeding analysis module database");

            let pool = get_database_pool(app, Module::Analysis).await?;

            seeds::analysis_seed::postgres_seed(&pool).await?;

            Ok(())
        }
    }
}

async fn check_database(app: &AppHandle, pool: &Database) -> Result<(), sqlx::Error> {
    println!("Checking database");

    match pool {
        Database::Sqlite(pool) => {
            let meta_row = sqlx::query("SELECT * FROM metadata LIMIT 1")
                .fetch_one(pool)
                .await;

            match meta_row {
                Ok(row) => {
                    let metadata = Metadata {
                        key: row.get("key"),
                    };

                    if metadata.key == "SIGE software" {
                        println!("Database already initialized, setup of database finished");
                    }

                    Ok(())
                }
                // Captura el error que dara la base de datos si esta no tiene una tabla llamada metadatos
                Err(Error::RowNotFound) => {
                    println!("Database is not initialized, seeding up");
                    seed(&app, &Database::Sqlite(pool.clone())).await?;

                    println!("Setup of database finished");

                    Ok(())
                }

                Err(_) => {
                    println!("Database is not initialized, seeding up");
                    seed(&app, &Database::Sqlite(pool.clone())).await?;

                    println!("Setup of database finished");

                    Ok(())
                }
            }
        }
        Database::PostgreSQL(pool) => {
            let meta_row = sqlx::query("SELECT * FROM metadata LIMIT 1")
                .fetch_one(pool)
                .await;

            match meta_row {
                Ok(row) => {
                    let metadata = Metadata {
                        key: row.get("key"),
                    };

                    if metadata.key == "SIGE software" {
                        println!("Database already initialized, setup of database finished");
                    }

                    Ok(())
                }
                // Captura el error que dara la base de datos si esta no tiene una tabla llamada metadatos
                Err(Error::RowNotFound) => {
                    println!("Database is not initialized, seeding up");
                    seed(&app, &Database::PostgreSQL(pool.clone())).await?;

                    println!("Setup of database finished");

                    Ok(())
                }

                Err(_) => {
                    println!("Database is not initialized, seeding up");
                    seed(&app, &Database::PostgreSQL(pool.clone())).await?;

                    println!("Setup of database finished");

                    Ok(())
                }
            }
        }
    }
}

pub async fn initialize_database(app: &mut App) -> Result<Database, DatabaseError> {
    println!("Inicializando base de datos");

    let store = app.store("settings.json")?;

    let key = format!("{}_local_mode", Module::default().as_str());

    let local_mode = unwrap_safe_store(&store, &key).and_then(|v| v.as_bool());

    match local_mode {
        Some(true) => {
            println!("Localmode activated, initializing memory database");

            let pool = SqlitePool::connect("sqlite::memory:").await?;

            check_database(&app.app_handle(), &Database::Sqlite(pool.clone())).await?;

            Ok(Database::Sqlite(pool))
        }
        Some(false) => {
            println!("Localmode deactivated, initializing PostgreSQL database");

            let db_direction = generate_db_direction(&store, Module::Personal).expect("Error generating db direction");

            println!("Database direction: {db_direction}");

            let pool = PgPool::connect(&db_direction).await?;

            Ok(Database::PostgreSQL(pool))
        }
        _ => {
            println!("Localmode not configured, initializing memory database");

            let pool = SqlitePool::connect("sqlite::memory:").await?;

            check_database(&app.app_handle(), &Database::Sqlite(pool.clone())).await?;

            Ok(Database::Sqlite(pool))
        }
    }
}

pub async fn initialize_local_database(app: &mut App) -> Result<(), sqlx::Error> {
    let pool = SqlitePool::connect("sqlite::memory:").await?;
    let db = Database::Sqlite(pool);

    seed(app.app_handle(), &db).await?;

    app.manage(Mutex::new( AppState { db }));

    Ok(())
}

pub async fn get_database_pool(app: &AppHandle, module: Module) -> Result<sqlx::PgPool, sqlx::Error> {
    let store = app.store("settings.json").map_err(|e| sqlx::Error::ColumnNotFound(e.to_string()))?;

    let db_direction = generate_db_direction(&store, module).expect("Error generating db direction");

    let pool = PgPool::connect(&db_direction).await?;

    Ok(pool)
}