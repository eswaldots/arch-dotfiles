use std::collections::HashMap;

use super::database_definitions::Database;

#[derive()]
pub struct AppState {
    pub db: Database,
}

// Definimos un enum para los módulos
#[derive(Debug, Clone, Copy)]
pub enum Module {
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

