use serde::{Deserialize, Serialize};

use super::database_definitions::Database;

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct AppState {
    pub db: Database,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Deserialize, Serialize)]
pub enum Module {
    Personal,
    Analysis,
}

impl Module {
    pub fn as_str(&self) -> &'static str {
        match self {
            Module::Personal => "personal",
            Module::Analysis => "analysis",
        }
    }
}

