use thiserror::Error;

#[derive(Debug, Error)]
pub enum SetupError {
    #[error("Failed to connect to database: {0}")]
    DatabaseError(#[from] DatabaseError),
    #[error("Unknown error ocurred at start of program: {0}")]
    Unknown(String)
} 

#[derive(Debug, Error)]
pub enum DatabaseError {
    #[error("Failed to connect to database: {0}")]
    SqlxError(#[from] sqlx::Error),
    #[error("Failed to get database configuration: {0}")]
    ConfigurationError(#[from] tauri_plugin_store::Error)
}