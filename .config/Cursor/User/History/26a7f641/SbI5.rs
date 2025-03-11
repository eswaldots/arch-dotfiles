use tauri::{AppHandle, Manager};
use tauri_plugin_store::StoreExt;
use validator::Validate;

use crate::{
    definitions::{
        app_definitions::AppState,
        config_definitions::{
            CustomTable, DbConfig, DbConfigResponse, EnterpriseConfig, EnterpriseConfigResponse,
            GeneralConfig, GeneralConfigResponse, GetTablesResponse, SaveConfigResponse,
            SaveDbConfigResponse, SaveError,
        },
    },
    services::config_service::{
        self, check_database_direction as check_database_direction_service,
    },
};

#[tauri::command]
pub async fn get_general_config(
    app_handle: AppHandle,
) -> Result<GeneralConfigResponse, GeneralConfigResponse> {
    let store = match app_handle.store("settings.json") {
        Ok(store) => store,
        Err(_) => {
            return Err(GeneralConfigResponse {
                success: false,
                data: None,
                error: Some("No se pudo acceder al almacenamiento".to_string()),
            })
        }
    };

    let data = config_service::get_general_config(store);

    match data {
        Ok(data) => Ok(GeneralConfigResponse {
            success: true,
            data: Some(data),
            error: None,
        }),
        Err(error) => Ok(GeneralConfigResponse {
            success: false,
            data: None,
            error: Some(error.to_string()),
        }),
    }
}

#[tauri::command]
pub async fn save_general_config(
    app_handle: AppHandle,
    config: GeneralConfig,
    module: Option<String>,
) -> Result<SaveConfigResponse, SaveConfigResponse> {
    let store = match app_handle.store("settings.json") {
        Ok(store) => store,
        Err(_) => {
            return Err(SaveConfigResponse {
                success: false,
                error: Some("No se pudo acceder al almacenamiento".to_string()),
            })
        }
    };

    let app_dir = app_handle.path().app_data_dir().map_err(|e| {
        println!("Error getting app dir: {}", e);
        SaveConfigResponse {
            success: false,
            error: Some("Error al guardar la configuración".to_string()),
        }
    })?;

    let app_dir = app_dir.to_str().expect("Error convertir path a string");

    match config_service::save_general_config(store, config, module.as_deref(), app_dir).await {
        Ok(_) => Ok(SaveConfigResponse {
            success: true,
            error: None,
        }),

        Err(SaveError::SaveError) => Err(SaveConfigResponse {
            success: false,
            error: Some("Error al guardar la configuración".to_string()),
        }),

        Err(SaveError::ImageError) => Err(SaveConfigResponse {
            success: false,
            error: Some("Error al guardar imagen".to_string()),
        }),

        Err(SaveError::Other(error)) => {
            println!("Error desconocido guardando configuracion: {}", error);

            Err(SaveConfigResponse {
                success: false,
                error: Some("Error desconocido".to_string()),
            })
        }
    }
}

#[tauri::command]
pub fn get_enterprise_config(
    app_handle: AppHandle,
) -> Result<EnterpriseConfigResponse, EnterpriseConfigResponse> {
    let store = match app_handle.store("settings.json") {
        Ok(store) => store,
        Err(_) => {
            return Err(EnterpriseConfigResponse {
                success: false,
                data: None,
                error: Some("No se pudo acceder al almacenamiento".to_string()),
            })
        }
    };

    let data = config_service::get_enterprise_config(store);

    match data {
        Ok(data) => Ok(EnterpriseConfigResponse {
            success: true,
            data: Some(data),
            error: None,
        }),
        Err(error) => Ok(EnterpriseConfigResponse {
            success: false,
            data: None,
            error: Some(error.to_string()),
        }),
    }
}

#[tauri::command]
pub async fn save_enterprise_config(
    app_handle: AppHandle,
    config: EnterpriseConfig,
) -> Result<SaveConfigResponse, SaveConfigResponse> {
    let app_dir = app_handle.path().app_data_dir().map_err(|err| {
        println!("Error getting app dir: {}", err);

        SaveConfigResponse {
            success: false,
            error: Some("Error al guardar la configuración".to_string()),
        }
    })?;

    let app_dir = app_dir.to_str().expect("Error convertir path a string");

    let store = match app_handle.store("settings.json") {
        Ok(store) => store,
        Err(_) => {
            return Err(SaveConfigResponse {
                success: false,
                error: Some("No se pudo acceder al almacenamiento".to_string()),
            })
        }
    };

    match config.validate() {
        Ok(_) => match config_service::save_enterprise_config(store, config, &app_dir).await {
            Ok(_) => Ok(SaveConfigResponse {
                success: true,
                error: None,
            }),
            Err(SaveError::SaveError) => {
                println!("Error al guardar en configuracion");

                Err(SaveConfigResponse {
                    success: false,
                    error: Some("Error al guardar la configuración".to_string()),
                })
            }
            Err(SaveError::ImageError) => Err(SaveConfigResponse {
                success: false,
                error: Some("Error al guardar imagen".to_string()),
            }),

            Err(SaveError::Other(error)) => {
                println!("Error desconocido guardando configuracion: {}", error);

                Err(SaveConfigResponse {
                    success: false,
                    error: Some("Error desconocido".to_string()),
                })
            }
        },
        Err(error) => Err(SaveConfigResponse {
            success: false,
            error: Some(error.to_string()),
        }),
    }
}

#[tauri::command]
pub fn get_db_config(app_handle: AppHandle, module: String) -> DbConfigResponse {
    let store = match app_handle.store("settings.json") {
        Ok(store) => store,
        Err(_) => {
            return DbConfigResponse {
                success: false,
                data: None,
                error: Some("No se pudo acceder al almacenamiento".to_string()),
            }
        }
    };

    let db_config = config_service::get_db_config(store, &module);

    DbConfigResponse {
        success: true,
        data: Some(db_config),
        error: None,
    }
}

#[tauri::command]
pub fn save_db_config(
    app_handle: AppHandle,
    config: DbConfig,
    module: String,
) -> Result<SaveDbConfigResponse, SaveDbConfigResponse> {
    let store = match app_handle.store("settings.json") {
        Ok(store) => store,
        Err(_) => {
            return Err(SaveDbConfigResponse {
                success: false,
                error: Some("No se pudo acceder al almacenamiento".to_string()),
                error_fields: None,
            })
        }
    };

    if config.local_mode == Some(false) {
        if let Err(errors) = config.validate() {
            return Err(SaveDbConfigResponse {
                success: false,
                error: Some("Hay uno o varios errores en la configuración".to_string()),
                error_fields: Some(errors),
            });
        }
    }

    match config_service::save_db_config(store, config, &module) {
        Ok(_) => Ok(SaveDbConfigResponse {
            success: true,
            error: None,
            error_fields: None,
        }),

        Err(error) => {
            println!("Error guardando la configuración: {:?}", error);

            Err(SaveDbConfigResponse {
                success: false,
                error: Some("Error al guardar la configuración".to_string()),
                error_fields: None,
            })
        }
    }
}

#[tauri::command]
pub async fn check_database_direction(
    config: DbConfig,
) -> Result<SaveDbConfigResponse, SaveDbConfigResponse> {
    match config.validate() {
        Ok(_) => {
            let db_direction = format!(
                "postgresql://{}:{}@{}:{}/{}",
                config.db_user.expect("Unexpected error"),
                config.db_password.expect("Unexpected error"),
                config.db_host.expect("Unexpected error"),
                config.db_port.expect("Unexpected error"),
                config.db_name.expect("Unexpected error")
            );

            if let Err(e) = check_database_direction_service(&db_direction).await {
                return Err(SaveDbConfigResponse {
                    success: false,
                    error: Some(format!("Error al conectar a la base de datos: {}", e)),
                    error_fields: None,
                });
            }

            Ok(SaveDbConfigResponse {
                success: true,
                error: None,
                error_fields: None,
            })
        }

        Err(errors) => Err(SaveDbConfigResponse {
            success: false,
            error: Some("Error al guardar la configuración".to_string()),
            error_fields: Some(errors),
        }),
    }
}

#[tauri::command]
pub async fn get_tables(
    state: tauri::State<'_, tokio::sync::Mutex<AppState>>,
) -> Result<GetTablesResponse, GetTablesResponse> {
    let db = &state.lock().await.db;
    match config_service::get_tables(db).await {
        Ok(tables) => Ok(GetTablesResponse {
            success: true,
            data: Some(tables),
            error: None,
        }),

        Err(error) => Err(GetTablesResponse {
            success: false,
            data: None,
            error: Some(error.to_string()),
        }),
    }
}

#[tauri::command]
pub async fn save_table(
    state: tauri::State<'_, tokio::sync::Mutex<AppState>>,
    table: CustomTable,
) -> Result<SaveConfigResponse, SaveConfigResponse> {
    let db = &state.lock().await.db;
    match config_service::save_table(db, table).await {
        Ok(_) => Ok(SaveConfigResponse {
            success: true,
            error: None,
        }),
        Err(error) => Err(SaveConfigResponse {
            success: false,
            error: Some(error.to_string()),
        }),
    }
}
