use std::collections::HashMap;

use super::database_definitions::Database;

#[derive()]
pub struct AppState {
    pub db: Database,
}

// Definimos un enum para los módulos
#[derive(Debug, Clone, Copy)]
pub enum Module {
    Auth,
    Settings,
    Dashboard,
    // Añade aquí más módulos según necesites
}

impl Module {
    // Implementamos una función para obtener el nombre del módulo como string
    pub fn as_str(&self) -> &'static str {
        match self {
            Module::Auth => "auth",
            Module::Settings => "settings",
            Module::Dashboard => "dashboard",
            // Añade aquí más casos según los módulos que hayas definido
        }
    }
}

// Si necesitas una colección de todos los módulos, puedes crear un array constante
pub const ALL_MODULES: [Module; 3] = [
    Module::Auth,
    Module::Settings,
    Module::Dashboard,
];







