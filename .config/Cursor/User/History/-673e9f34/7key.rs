use super::database_definitions::Database;

#[derive()]
pub struct AppState {
    pub db: Database,
}

pub enum Module {
    Personal,
}