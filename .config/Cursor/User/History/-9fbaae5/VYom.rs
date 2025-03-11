use crate::{
    definitions::{analysis_definitions::RepeinJSON, app_definitions::AppState, database_definitions::Database},
};
use tokio::sync::Mutex;
use tauri::State;

pub async fn save_repein_command(state: State<'_, Mutex<AppState>>, repein: RepeinJSON) -> Result<GenericPost, GenericPost> {
    let pool = &state.lock().await.pool;

}
