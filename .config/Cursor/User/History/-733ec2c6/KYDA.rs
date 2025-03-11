use crate::{definitions::{app_definitions::Module, responses_model::GenericPost}, services};

#[tauri::command]
pub async fn change_database_pool(
    app_handle: tauri::AppHandle,
    module: Module,
) -> Result<GenericPost, GenericPost> {
    let state = app_handle.state::<Mutex<AppState>>();
    let mut state = state.lock().await;

    match services::database_service::get_database_pool(&app_handle, module).await {
        Ok(pool) => {
            state.db = Database::Pg(pool);

            Ok(GenericPost {
                success: true,
                error: None,
            })
        }

        Err(_) => {
            Err(GenericPost {
                success: false,
                error: Some("Error getting database pool".to_string()),
            })
        }
    }
        Err(err) => {
            let error_message = err.to_string();
            println!("Error changing database pool: {}", error_message);

            if let Err(e) = services::database_service::initialize_local_database(&app_handle).await {
                println!("Error initializing local database: {}", e);
            };


            Err(GenericPost {
                success: false,
                error: Some(error_message),
            })
        }
    }
}