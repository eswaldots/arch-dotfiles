use crate::{definitions::app_definitions::AppState, services::database_service};

use tauri::{App, Manager};

pub async fn initialize(app: &mut App) {
    println!("Initializing setup");

    let db = database_service::initialize_database(app)
        .await
        .expect("Error initializing database");

    app.manage(AppState { db });

    println!("Setup initialized")
}
