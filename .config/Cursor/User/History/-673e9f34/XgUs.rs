use serde::{Deserialize, Serialize};
use thiserror::Error;
use super::database_definitions::Database;

#[derive()]
pub struct AppState {
    pub db: Database,
}

#[derive(Error, Debug)]
pub enum AppError {
    #[source]
    Database: sqlx::Error,
    #[error("Error de configuración: {0}")]
    Config(#[from] tauri_plugin_dialog::Error),
    #[error("Error de validación: {0}")]
    Validation(String),
    #[error("Recurso no encontrado: {0}")]
    NotFound(String),
    #[error("Error interno: {0}")]
    Internal(String),
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Deserialize, Serialize, Default)]
pub enum Module {
    #[default]
    Personal,
    Analysis,
}


impl Module {
    // Implementamos una función para obtener el nombre del módulo como string
    pub fn as_str(&self) -> &'static str {
        match self {
            Module::Personal => "personal",
            Module::Analysis => "analysis",
        }
    }
}