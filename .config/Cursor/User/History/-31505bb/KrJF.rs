use thiserror::Error;

#[derive(Debug, Error)]
pub enum SetupError {
    #[error("Failed to connect to database: {0}")]
} 