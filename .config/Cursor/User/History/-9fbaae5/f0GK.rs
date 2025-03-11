use crate::definitions::{analysis_definitions::RepeinJSON, app_definitions::AppState, database_definitions::Database, responses_model::GenericPost};
use tokio::sync::Mutex;
use tauri::State;

pub async fn save_repein_command(state: State<'_, Mutex<AppState>>, repein: RepeinJSON) -> Result<GenericPost, GenericPost> {
    let db = &state.lock().await.db;

    match services::analysis_service::save_repein(db, repein).await {
        Ok(_) => Ok(GenericPost {
            success: true,
            error: None,
        }),
        Err(e) => Err(GenericPost {
            success: false,
            error: Some(e.to_string()),
        }),
    }
}
