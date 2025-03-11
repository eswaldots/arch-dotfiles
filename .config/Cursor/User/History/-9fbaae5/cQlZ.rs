use crate::{
    definitions::{analysis_definitions::RepeinJSON, database_definitions::Database},
    services::analysis_service::save_repein as service_save_repein,
    state::AppState,
};
use std::sync::Mutex;
use tauri::State;
use crate::definitions::generic_definitions::GenericResponse;

pub async fn save_repein_command(state: State<'_, Mutex<AppState>>, repein: RepeinJSON) -> Result<GenericResponse, String> {
    let pool = &state.lock().unwrap().pool;

    service_save_repein(repein, pool)
        .await
        .map_err(|e| e.to_string())
}
