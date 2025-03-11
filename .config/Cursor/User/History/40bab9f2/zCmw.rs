use serde::{Deserialize, Serialize};

/// Tipo Result personalizado para la aplicación
pub type AppResult<T> = Result<T, AppError>;

/// Respuesta genérica para comandos Tauri
#[derive(Serialize, Deserialize)]
pub struct ApiResponse<T> {
    pub data: Option<T>,
    pub success: bool,
    pub error: Option<String>,
}

impl<T> ApiResponse<T> {
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

/// Función helper para convertir AppResult en una respuesta serializable para Tauri
pub fn to_response<T: Serialize>(result: AppResult<T>) -> ApiResponse<T> {
    match result {
        Ok(data) => ApiResponse::success(data),
        Err(err) => ApiResponse::error(&err),
    }
}
