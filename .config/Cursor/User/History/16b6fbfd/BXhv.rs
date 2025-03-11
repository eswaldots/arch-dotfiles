#[command]
async fn login(
    State(app_state): State<AppState>,  // Proper state access
    username: String,
    password: String,
) -> Result<(), String> {
    let pool = app_state.db_pool.lock().await;
    let pool = pool.as_ref().ok_or("Database not initialized")?;
    
    // ... rest of login logic ...
    Ok(())
} 