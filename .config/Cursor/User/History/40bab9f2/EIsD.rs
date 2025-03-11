use serde::{Deserialize, Serialize};

use super::app_definitions::AppError;

/// Tipo Result personalizado para la aplicación
pub type AppResult<T> = Result<T, AppError>;

/// Respuesta genérica para comandos Tauri que devuelven datos
#[derive(Serialize, Deserialize)]
pub struct CommandResponse<T> {
    pub data: Option<T>,
    pub success: bool,
    pub error: Option<String>,
}

/// Respuesta para comandos que solo necesitan indicar éxito/fracaso
#[derive(Serialize, Deserialize)]
pub struct StatusResponse {
    pub success: bool,
    pub error: Option<String>,
}

impl<T> CommandResponse<T> {
    pub fn success(data: T) -> Self {
        Self {
            data: Some(data),
            success: true,
            error: None,
        }
    }
    
    pub fn error(err: &AppError) -> Self {
        Self {
            data: None,
            success: false,
            error: Some(err.to_string()),
        }
    }
}

impl StatusResponse {
    pub fn success() -> Self {
        Self {
            success: true,
            error: None,
        }
    }
    
    pub fn error(err: &AppError) -> Self {
        Self {
            success: false,
            error: Some(err.to_string()),
        }
    }
}

/// Función helper para convertir AppResult<T> en CommandResponse<T>
pub fn to_response<T: Serialize>(result: AppResult<T>) -> CommandResponse<T> {
    match result {
        Ok(data) => CommandResponse::success(data),
        Err(err) => CommandResponse::error(&err),
    }
}

/// Función helper para convertir AppResult<()> en StatusResponse
pub fn to_status_response(result: AppResult<()>) -> StatusResponse {
    match result {
        Ok(_) => StatusResponse::success(),
        Err(err) => StatusResponse::error(&err),
    }
}
