use crate::{definitions::{analysis_definitions::{PublicRepein, RepeinJSON}, app_definitions::AppState, responses_model::{to_command_result, to_status_result, CommandResult, StatusResult}}, services};
use tokio::sync::Mutex;
use tauri::State;

#[tauri::command]
pub async fn save_repein(state: State<'_, Mutex<AppState>>, repein: RepeinJSON) -> StatusResult {
    let db = &state.lock().await.db;

    let result = services::analysis_service::save_repein(repein, db).await;

    to_status_result(result.map_err(Into::into))
}

#[tauri::command]
pub async fn get_public_repein(state: State<'_, Mutex<AppState>>) -> CommandResult<Vec<PublicRepein>> {
    let db = &state.lock().await.db;

    let result = services::analysis_service::get_public_repein(db).await;

    to_command_result(result.map_err(Into::into))
}