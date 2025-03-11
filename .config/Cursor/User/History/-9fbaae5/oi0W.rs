use crate::{
    definitions::{analysis_definitions::RepeinJSON, database_definitions::Database},
    services::analysis_service::save_repein,
};

pub async fn save_repein(state: tauri::State<'_, Mutex<AppState>>, repein: RepeinJSON) -> Result<(), sqlx::Error> {
    let pool = &state.lock().await.pool;

    save_repein(repein, pool).await
}
