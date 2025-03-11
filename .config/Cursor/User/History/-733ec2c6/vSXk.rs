use crate::{definitions::{app_definitions::Module, responses_model::GenericPost}, services};

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
    Err(err) => {
        println!("Error changing database pool, using local mode: {}", err);

        services::database_service::initialize_local_database(app_handle).await?;

        Err(GenericPost {
            success: false,
            error: Some(err.to_string()),
        })
    }
   }
}