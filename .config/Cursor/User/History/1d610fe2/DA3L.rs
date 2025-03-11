use crate::{definitions::app_definitions::AppState, services::database_service};

use tauri::{App, Manager};
use std::sync::Mutex;
use std::sync::Arc;

pub async fn initialize(app: &mut App) {
    println!("Initializing setup");

    let db = database_service::initialize_database(app)
        .await
        .expect("Error initializing database");

    let app_state = AppState {
        db: Database::Sqlite(db),
    };

    app.manage(app_state);

    println!("Setup initialized")
}

pub fn setup() -> Box<dyn Fn(&mut App) -> Result<(), Box<dyn std::error::Error + Send + Sync>> + Send + Sync> {
    Box::new(|app| {
        // Create app state with Mutex for safe mutation
        app.manage(AppState {
            db: Database::Sqlite(db),
        });

        // ... rest of existing setup code ...
        Ok(())
    })
}
