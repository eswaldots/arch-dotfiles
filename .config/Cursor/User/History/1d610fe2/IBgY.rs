use crate::{definitions::{app_definitions::AppState, error_definitions::SetupError}, services::database_service};

use tauri::{App, Manager};
use tokio::sync::Mutex;

pub async fn initialize(app: &mut App) -> Result<(), SetupError> {
    println!("Initializing setup");

    let db = database_service::initialize_database(app)
        .await.map_err(|e| SetupError::DatabaseError(e.to_string()))?;

    app.manage(Mutex::new(AppState { db }));

    println!("Setup finished");

    Ok(())
}
