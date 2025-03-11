use crate::definitions::{app_definitions::Module, responses_model::GenericPost};

#[tauri::command]
pub async fn change_database_pool(
    app_handle: tauri::AppHandle,
    module: Module,
) -> Result<GenericPost, GenericPost> {
   match services::database_service::change_database_pool(app_handle, module).await {
    Ok(_) => Ok(GenericPost {
        success: true,
        error: None,
    }),
    Err(err) => Err(GenericPost {
        success: false,
        error: Some(err.to_string()),
    }),
   }
}