mod commands;
mod definitions;
mod services;
mod setup;
mod utils;
mod seeds;

use definitions::error_definitions::SetupError;
use services::database_service::initialize_local_database;
use tauri::async_runtime::block_on;
use tauri::Manager;
use tauri_plugin_store::StoreExt;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_process::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_sql::Builder::new().build())
        // TODO: Remove sql plugin
        .plugin(tauri_plugin_store::Builder::new().build())
        .plugin(tauri_plugin_shell::init())
        .setup(|app| {
            let store = app.store("settings.json")?;

            // store.set("dark_mode", json!(true));
            // store.set("report_directory", "d");

            /* IMPORTANTE: Si el programa crashea debido a que se puso un parametro de conexion hacia
            la base de datos, solo basta con descomentar la linea de abajo y volver a iniciarlo */

            // store.set("local_mode", true);

            block_on(async move { 
                if let Err(e) = setup::initialize(app).await {
                    match e {
                        SetupError::DatabaseError(_) => {
                            println!("Error conecting to db");

                            initialize_local_database(app.app_handle()).await;
                        },
                        SetupError::Unknown(_) => {
                            println!("unkwnon error");
                        }
                    }
                }

                Ok(())
             });
        })
        .invoke_handler(tauri::generate_handler![
            // USERS COMMANDS
            commands::users_commands::login,
            // CONFIG COMMANDS
            commands::config_commands::get_general_config,
            commands::config_commands::save_general_config,
            commands::config_commands::get_enterprise_config,
            commands::config_commands::save_enterprise_config,
            commands::config_commands::get_db_config,
            commands::config_commands::save_db_config,
            commands::config_commands::check_database_direction,
            commands::config_commands::get_tables,
            commands::config_commands::save_table,
            // ARCHIVE COMMANDS
            commands::archive_commands::get_custom_table_fields,
            commands::archive_commands::get_institutes,
            commands::archive_commands::get_custom_table,
            commands::archive_commands::create_custom_row,
            // PERSONAL COMMANDS
            commands::personal_commands::create_personal,
            commands::personal_commands::get_public_personal,
            commands::personal_commands::get_personal_by_id,
            commands::personal_commands::delete_personal,
            // DATABASE COMMANDS
            commands::database_commands::change_database_pool,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
