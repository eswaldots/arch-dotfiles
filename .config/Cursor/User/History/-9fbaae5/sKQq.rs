use crate::{definitions::{analysis_definitions::RepeinJSON, app_definitions::AppState, responses_model::GenericPost}, services};
use tokio::sync::Mutex;
use tauri::State;

#[tauri::command]
pub async fn save_repein(state: State<'_, Mutex<AppState>>, repein: RepeinJSON) -> StatusResult {
    let db = &state.lock().await.db;

    let result = 

    services::analysis_service::save_repein(repein, db).await 
    }