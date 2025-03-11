use serde::{Deserialize, Serialize};

use super::app_definitions::AppError;

/// Tipo Result personalizado para la aplicación
pub type AppResult<T> = Result<T, AppError>;

/// Respuesta genérica para comandos Tauri que devuelven datos
#[derive(Serialize, Deserialize)]
pub struct Command<T> {
    pub data: Option<T>,
    pub success: bool,
    pub error: Option<String>,
}

/// Respuesta para comandos que solo necesitan indicar éxito/fracaso
#[derive(Serialize, Deserialize)]
pub struct Status {
    pub success: bool,
    pub error: Option<String>,
}

impl<T> Command<T> {
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

impl Status {
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
pub fn to_response<T: Serialize>(result: AppResult<T>) -> Command<T> {
    match result {
        Ok(data) => Command::success(data),
        Err(err) => Command::error(&err),
    }
}

/// Función helper para convertir AppResult<()> en StatusResponse
pub fn to_status_response(result: AppResult<()>) -> Status {
    match result {
        Ok(_) => Status::success(),
        Err(err) => Status::error(&err),
    }
}

pub type StatusResponse = Result<Status, Status>;

impl StatusResponse {
    pub fn success() -> Self {
        Ok(Status::success())
    }

    pub fn error(err: &AppError) -> Self {
        Err(Status::error(err))
    }
}