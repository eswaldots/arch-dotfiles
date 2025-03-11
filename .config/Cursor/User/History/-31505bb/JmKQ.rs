use thiserror::Error;

#[derive(Debug, Error)]
pub enum SetupError {
    #[error("Failed to connect to database: {0}")]
    DatabaseError(String),
    #[error("Unknown error ocurred at start of program: {0}")]
    Unknown(String)
} 