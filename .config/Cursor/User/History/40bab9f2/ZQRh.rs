use serde::{Deserialize, Serialize};
use crate::definitions::app_definitions::AppError;

/// Tipo Result personalizado para la aplicación
pub type AppResult<T> = Result<T, AppError>;

/// Respuesta genérica para comandos Tauri que devuelven datos
#[derive(Serialize, Deserialize, Clone)]
pub struct CommandResponse<T> {
    pub data: Option<T>,
    pub success: bool,
    pub error: Option<String>,
}

/// Respuesta para comandos que solo necesitan indicar éxito/fracaso
#[derive(Serialize, Deserialize, Clone)]
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

/// Tipos de Result para usar en comandos Tauri
pub type CommandResult<T> = Result<CommandResponse<T>, CommandResponse<T>>;
pub type StatusResult = Result<StatusResponse, StatusResponse>;

/// Función helper para convertir AppResult<T> en CommandResult<T>
pub fn to_command_result<T: Serialize>(result: AppResult<T>) -> CommandResult<T> {
    match result {
        Ok(data) => Ok(CommandResponse::success(data)),
        Err(err) => {
            let response = CommandResponse::error(&err);
            Err(response)
        }
    }
}

/// Función helper para convertir AppResult<()> en StatusResult
pub fn to_status_result(result: AppResult<()>) -> StatusResult {
    match result {
        Ok(_) => Ok(StatusResponse::success()),
        Err(err) => {
            let response = StatusResponse::error(&err);
            Err(response)
        }
    }
}
