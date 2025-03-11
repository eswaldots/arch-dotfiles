use crate::{definitions::{app_definitions::Module, database_definitions::Database, responses_model::GenericPost}, services};
use crate::state::AppState;
use tokio::sync::Mutex;

#[tauri::command]
pub async fn change_database_pool(
    state: tauri::State<'_, Mutex<AppState>>,
    module: Module,
) -> Result<GenericPost, GenericPost> {
    let mut state = state.lock().await;
    let mut state = state.lock().await;

    match services::database_service::get_database_pool(&app_handle, module).await {
        Ok(pool) => {
            state.db = &Database::Pg(pool);

            Ok(GenericPost {
                success: true,
                error: None,
            })
        }

        Err(_) => {
            Err(GenericPost {
                success: false,
                error: Some("Error changing database pool".to_string()),
            })
        }
    }
}