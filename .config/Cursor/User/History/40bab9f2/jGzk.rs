use serde::{Deserialize, Serialize};

use super::app_definitions::AppError;

/// Tipo Result personalizado para la aplicación
pub type AppResult<T> = Result<T, AppError>;

/// Respuesta genérica para comandos Tauri
#[derive(Serialize, Deserialize)]
pub struct CommandResponse<T> {
    pub data: Option<T>,
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

pub fn to_response<T: Serialize>(result: AppResult<T>) -> CommandResponse<T> {
    match result {
        Ok(data) => CommandResponse::success(data),
        Err(err) => CommandResponse::error(&err),
    }
}
