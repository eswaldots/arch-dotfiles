use tokio::sync::Mutex;

use crate::{
    definitions::{
        app_definitions::AppState,
        users_definitions::{AuthError, LoginResponse},
    },
    services::users_service,
};

#[tauri::command]
pub async fn login(
    state: tauri::State<'_, Mutex<AppState>>,
    user_name: String,
    user_password: String,
) -> Result<LoginResponse, LoginResponse> {
    let db = state.lock().await.db;
    let db = &db;

    let result = users_service::login(db, &user_name, &user_password).await;

    match result {
        Ok(session_id) => Ok(LoginResponse {
            success: true,
            error: None,
            session_id: Some(session_id.to_string()),
        }),

        Err(AuthError::InvalidCredentials) => Ok(LoginResponse {
            success: false,
            error: Some("Usuario o contraseña invalida".to_string()),
            session_id: None,
        }),

        Err(AuthError::DatabaseError) => Ok(LoginResponse {
            success: false,
            error: Some("Error en la base de datos".to_string()),
            session_id: None,
        }),

        Err(AuthError::Other(error)) => Ok(LoginResponse {
            success: false,
            error: Some(error),
            session_id: None,
        }),
    }
}
