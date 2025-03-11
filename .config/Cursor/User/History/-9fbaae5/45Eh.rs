use crate::{
    definitions::{analysis_definitions::RepeinJSON, database_definitions::Database},
    services::analysis_service::save_repein,
};

pub async fn save_repein(state: tauri::State<'_, Mutex<AppState>>, repein: RepeinJSON) -> Result<(), sqlx::Error> {
    let app_state = state.lock().await;
    let pool = app_state.pool.clone();

    save_repein(repein, &pool).await
}
