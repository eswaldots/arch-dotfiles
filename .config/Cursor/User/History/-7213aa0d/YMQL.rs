use tauri::State;

use crate::{
    definitions::{
        app_definitions::AppState,
        archive_definitions::{
            CreateCustomRowResponse, GetCustomTable, GetCustomTableFields,
            GetCustomTableFieldsResponse, GetCustomTableResponse, GetInstitutesResponse,
        },
    },
    services,
};

#[tauri::command]
pub async fn get_custom_table_fields(
    state: State<'_, AppState>,
    table_name: String,
) -> GetCustomTableFieldsResponse {
    let pool = &state.db;

    match services::archive_service::get_custom_table_fields(pool, &table_name).await {
        Ok(data) => Ok(GetCustomTableFields::from(data)),
        Err(err) => Err(GetCustomTableFields::from(err)),
    }
}

#[tauri::command]
pub async fn get_institutes(
    state: State<'_, AppState>,
) -> Result<GetInstitutesResponse, GetInstitutesResponse> {
    let pool = &state.db;

    let institutes = match services::archive_service::get_institutes(pool).await {
        Ok(data) => data,
        Err(err) => {
            return Err(GetInstitutesResponse::from(err));
        }
    };

    let fields = match services::archive_service::get_custom_table_fields(pool, "institutos").await
    {
        Ok(data) => data,
        Err(err) => return Err(GetInstitutesResponse::from(err)),
    };

    Ok(GetInstitutesResponse {
        success: true,
        data: institutes,
        fields,
        error: None,
    })
}

#[tauri::command]
pub async fn get_custom_table(
    state: State<'_, AppState>,
    table_name: String,
    search_term: Option<String>,
) -> GetCustomTableResponse {
    let pool = &state.db;

    match services::archive_service::get_custom_table(pool, &table_name, search_term).await {
        Ok(data) => Ok(GetCustomTable::from(data)),
        Err(err) => Err(GetCustomTable::from(err)),
    }
}

#[tauri::command]
pub async fn create_custom_row(
    state: State<'_, tokio::sync::Mutex<AppState>>,
    table_name: String,
    data: String,
) -> Result<CreateCustomRowResponse, CreateCustomRowResponse> {
    let db = &state.lock().await.db;

    match services::archive_service::create_custom_row(db, &table_name, data).await {
        Ok(_) => Ok(CreateCustomRowResponse {
            success: true,
            error: None,
        }),
        Err(err) => Err(CreateCustomRowResponse {
            success: false,
            error: Some(err.to_string()),
        }),
    }
}
