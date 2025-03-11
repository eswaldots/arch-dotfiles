use core::panic;

use crate::definitions::app_definitions::AppState;
use crate::definitions::app_definitions::Module;
use crate::definitions::database_definitions::Database;
use crate::definitions::database_definitions::Metadata;
use crate::seeds;
use crate::utils::generate_db_direction::generate_db_direction;
use crate::utils::unwrap_safe_store::unwrap_safe_store;
use sqlx::{Error, PgPool, Row, SqlitePool};
use tauri::AppHandle;
use tauri::{App, Manager};
use tauri_plugin_dialog::DialogExt;
use tauri_plugin_dialog::MessageDialogKind;
use tauri_plugin_store::StoreExt;
use tokio::sync::Mutex;

async fn seed(pool: &Database) -> Result<(), sqlx::Error> {
    println!("Seeding database");

    match pool {
        Database::Sqlite(pool) => {
            seeds::personal_seed::sqlite_seed(pool)
        }
        Database::PostgreSQL(pool) => {
            seeds::personal_seed::postgres_seed(pool)
        }
    }
}

async fn check_database(pool: &Database) -> Result<(), sqlx::Error> {
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
                    seed(&Database::Sqlite(pool.clone())).await?;

                    println!("Setup of database finished");

                    Ok(())
                }

                Err(_) => {
                    println!("Database is not initialized, seeding up");
                    seed(&Database::Sqlite(pool.clone())).await?;

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
                    seed(&Database::PostgreSQL(pool.clone())).await?;

                    println!("Setup of database finished");

                    Ok(())
                }

                Err(_) => {
                    println!("Database is not initialized, seeding up");
                    seed(&Database::PostgreSQL(pool.clone())).await?;

                    println!("Setup of database finished");

                    Ok(())
                }
            }
        }
    }
}

pub async fn initialize_database(app: &mut App) -> Result<Database, Box<dyn std::error::Error>> {
    println!("Inicializando base de datos");

    let store = app.store("settings.json")?;

    let key = format!("{}_local_mode", Module::default().as_str());

    let local_mode = unwrap_safe_store(&store, &key).and_then(|v| v.as_bool());

    match local_mode {
        Some(true) => {
            println!("Localmode activated, initializing memory database");

            let pool = SqlitePool::connect("sqlite::memory:").await?;

            check_database(&Database::Sqlite(pool.clone())).await?;

            Ok(Database::Sqlite(pool))
        }
        Some(false) => {
            println!("Localmode deactivated, initializing PostgreSQL database");

            let db_direction = generate_db_direction(&store, Module::Personal).expect("Error generating db direction");

            println!("Database direction: {db_direction}");

            match PgPool::connect(&db_direction).await {
                Ok(pool) => {
                    let _ = check_database(&Database::PostgreSQL(pool.clone())).await?;

                    Ok(Database::PostgreSQL(pool))
                }
                Err(_) => {
                    app.dialog()
                        .message("Usted no tiene una base de datos")
                        .kind(MessageDialogKind::Error)
                        .blocking_show();

                    panic!("Error connecting to database");
                }
            }
        }
        _ => {
            println!("Localmode not configured, initializing memory database");

            let pool = SqlitePool::connect("sqlite::memory:").await?;

            check_database(&Database::Sqlite(pool.clone())).await?;

            Ok(Database::Sqlite(pool))
        }
    }
}

pub async fn initialize_local_database(app: &AppHandle) -> Result<(), sqlx::Error> {
    let state = app.state::<Mutex<AppState>>();
    let mut state = state.lock().await;

    let pool = SqlitePool::connect("sqlite::memory:").await?;

    state.db = Database::Sqlite(pool);

    Ok(())
}

pub async fn get_database_pool(app: &AppHandle, module: Module) -> Result<sqlx::PgPool, sqlx::Error> {
    let store = app.store("settings.json").map_err(|e| sqlx::Error::ColumnNotFound(e.to_string()))?;

    let db_direction = generate_db_direction(&store, module).expect("Error generating db direction");

    let pool = PgPool::connect(&db_direction).await?;

    Ok(pool)
}