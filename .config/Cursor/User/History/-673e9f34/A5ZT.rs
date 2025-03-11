use std::collections::HashMap;

use super::database_definitions::Database;

#[derive()]
pub struct AppState {
    pub db: Database,
}

const MODULES: HashMap<&str, &str> = HashMap::from([
    ("personal", "personal"),
    ("business", "business"),
]);






