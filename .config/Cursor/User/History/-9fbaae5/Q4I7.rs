use crate::{
    definitions::{analysis_definitions::RepeinJSON, app_definitions::AppState, database_definitions::Database}, responses_model::GenericPost, services::analysis_service::save_repein as service_save_repein
};
use tokio::sync::Mutex;
use tauri::State;

pub async fn save_repein_command(state: State<'_, Mutex<AppState>>, repein: RepeinJSON) -> Result<GenericPost, GenericPost> {
    let pool = &state.lock().await.pool;

    service_save_repein(repein, pool)
        .await
        .map_err(|e| e.to_string())
}
