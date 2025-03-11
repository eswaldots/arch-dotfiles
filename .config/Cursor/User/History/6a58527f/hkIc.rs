use tauri::State;

use crate::{
    definitions::{
        app_definitions::{AppError, AppState},
        personal_definitions::{PersonalJSON, PersonalSQL, PublicPersonal}, 
        responses_model::{to_command_result, to_status_result, CommandResult, StatusResult}
    },
    services,
};

#[tauri::command]
pub async fn create_personal(
    state: State<'_, tokio::sync::Mutex<AppState>>,
    personal: PersonalJSON,
) -> StatusResult {
    let db = state.lock().await.db.clone();

    let result = services::personal_service::create_personal(&db, personal).await;

    to_status_result(result.map_err(Into::into))
}

#[tauri::command]
pub async fn get_public_personal(
    state: State<'_, tokio::sync::Mutex<AppState>>,
    search_param: String,
) -> CommandResult<Vec<PublicPersonal>> {
    let db = &state.lock().await.db;
    
    let result = services::personal_service::get_public_personal(db, search_param).await;
    
    to_command_result(result.map_err(Into::into))
}

#[tauri::command]
pub async fn get_personal_by_id(
    state: State<'_, tokio::sync::Mutex<AppState>>,
    id: i32,
) -> CommandResult<PublicPersonal> {
    let db = &state.lock().await.db;
    
    let result = services::personal_service::get_personal_by_id(db, id).await;
    
    to_command_result(result.map_err(Into::into))
}

#[tauri::command]
pub async fn delete_personal(
    state: State<'_, tokio::sync::Mutex<AppState>>,
    id: i32,
) -> StatusResult {
    let db = &state.lock().await.db;
    
    let result = services::personal_service::delete_personal(id, db).await;
    
    to_status_result(result.map_err(Into::into))
}
