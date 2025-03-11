use tauri::State;

use crate::{
    definitions::{
        app_definitions::AppState,
        personal_definitions::{PersonalJSON, PersonalSQL, PublicPersonal},
        responses_model::{GenericGet, GenericPost},
    },
    services,
};

#[tauri::command]
pub async fn create_personal(
    state: State<'_, tokio::sync::Mutex<AppState>>,
    personal: PersonalJSON,
) -> Result<GenericPost, GenericPost> {
    let db = &state.lock().await.db;
    if let Err(e) = services::personal_service::create_personal(db, personal).await {
        println!("{}", e);

        return Err(GenericPost {
            error: Some("Error creating personal".to_string()),
            success: false,
        });
    }

    Ok(GenericPost {
        error: None,
        success: true,
    })
}

#[tauri::command]
pub async fn get_public_personal(
    state: State<'_, tokio::sync::Mutex<AppState>>,
    search_param: String,
) -> Result<GenericGet<Vec<PublicPersonal>>, GenericPost> {
    let db = &state.lock().await.db;
    match services::personal_service::get_public_personal(db, search_param).await {
        Ok(personal) => Ok(GenericGet {
            error: None,
            data: personal,
            success: true,
        }),
        Err(e) => Err(GenericPost {
            error: Some(e.to_string()),
            success: false,
        }),
    }
}

#[tauri::command]
pub async fn get_personal_by_id(
    state: State<'_, tokio::sync::Mutex<AppState>>,
    id: i32,
) -> Result<GenericGet<PersonalSQL>, GenericPost> {
    let db = &state.lock().await.db;
    match services::personal_service::get_personal_by_id(db, id).await {
        Ok(personal) => Ok(GenericGet {
            error: None,
            data: personal,
            success: true,
        }),
        Err(e) => Err(GenericPost {
            error: Some(e.to_string()),
            success: false,
        }),
    }
}

#[tauri::command]
pub async fn delete_personal(
    state: State<'_, tokio::sync::Mutex<AppState>>,
    id: i32,
) -> Result<GenericPost, GenericPost> {
    let db = &state.lock().await.db;
    match services::personal_service::delete_personal(id, db).await {
        Ok(_) => Ok(GenericPost {
            error: None,
            success: true,
        }),
        Err(e) => Err(GenericPost {
            error: Some(e.to_string()),
            success: false,
        }),
    }
}
