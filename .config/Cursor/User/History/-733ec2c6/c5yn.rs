use crate::definitions::{app_definitions::Module, responses_model::GenericPost};

#[tauri::command]
pub async fn change_database_direction(
    app_handle: tauri::AppHandle,
    module: Module,
) -> Result<GenericPost, GenericPost> {
   match change_database_pool(&mut app_handle, module).await {
    Ok(_) => Ok(GenericPost {
        success: true,
        error: None,
    }),
    Err(err) => Err(GenericPost {
        success: false,
        error: Some(err),
    }),
   }
}