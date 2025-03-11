use crate::{definitions::app_definitions::AppState, services::database_service};

use tauri::{App, Manager};
use std::sync::Mutex;

pub async fn initialize(app: &mut App) {
    println!("Initializing setup");

    let db = database_service::initialize_database(app)
        .await
        .expect("Error initializing database");

    app.manage(Mutex::new(AppState { db }));

    println!("Setup initialized")
}
