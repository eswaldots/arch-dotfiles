use crate::{definitions::{app_definitions::{AppError, AppState, Module}, database_definitions::Database, responses_model::StatusResponse}, services};
use tauri::Manager;
use tokio::sync::Mutex;

#[tauri::command]
pub async fn change_database_pool(
    app_handle: tauri::AppHandle,
    module: Module,
) -> StatusResponse {
    let state = app_handle.state::<Mutex<AppState>>();
    let mut state = state.lock().await;

    match services::database_service::get_database_pool(&app_handle, module).await {
        Ok(pool) => {
            state.db = Database::PostgreSQL(pool);

            StatusResponse::success()
        }

        Err(e) => {
            StatusResponse::error(&&AppError::Database(e))
        }
    }
}