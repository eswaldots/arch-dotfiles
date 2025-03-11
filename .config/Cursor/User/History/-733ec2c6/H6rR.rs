#[tauri::command]
pub async fn change_database_direction(
    app_handle: tauri::AppHandle,
    module: Module,
) {
    app_handle.manage(AppState { db: Database::PostgreSQL(pool) });
}