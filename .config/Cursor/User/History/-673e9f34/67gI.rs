use serde::{Deserialize, Serialize};
use super::database_definitions::Database;
use std::sync::Arc;
use tokio::sync::Mutex;

#[derive()]
pub struct AppState {
    pub db: Arc<Mutex<Database>>,
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

