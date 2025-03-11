use thiserror::Error;

#[derive(Debug, Error)]
pub enum SetupError {
    #[error("Failed to connect to database: {0}")]
    DatabaseError(String),
    #[error("Unknown error ocurred at start of program: {0}")]
    Unknown(String)
} 

#[derive(Debug, Error)]
pub enum DatabaseError {
    #[error("Failed to connect to database: {0}")]
    ConnectionError(String),
    #[error("Failed to create database client: {0}")]
    CreationError(String),
    #[error("Failed to seed database: {0}")]
    SeedError(String),
    #[error("Failed to check database: {0}")]
    CheckError(String),
    #[error("Failed to get database configuration: {0}")]
    ConfigurationError(#[from] tauri::Error)
}