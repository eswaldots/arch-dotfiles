use crate::{definitions::app_definitions::AppState, services::database_service};

use tauri::{App, Manager};
use std::sync::Arc;
use tokio::sync::Mutex;

pub async fn initialize(app: &mut App) {
    println!("Initializing setup");

    let db = database_service::initialize_database(app)
        .await
        .expect("Error initializing database");

    app.manage(AppState { 
        db: Arc::new(Mutex::new(db)) 
    });

    println!("Setup initialized")
}
