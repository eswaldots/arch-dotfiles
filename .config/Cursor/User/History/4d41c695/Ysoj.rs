use tauri::Wry;
use tauri_plugin_store::Store;
use crate::definitions::app_definitions::Module;

use super::unwrap_safe_store::unwrap_safe_store;

pub fn generate_db_direction(store: &Store<Wry>, module: Module) -> Result<String, String> {
    let module_str = module.as_str();
    
    let db_name = unwrap_safe_store(&store, &format!("{module_str}_db_name"))
        .and_then(|v| v.as_str().map(|s| s.to_string()))
        .expect("Db name doesnt exists, unhandled error");
    let db_user = unwrap_safe_store(store, &format!("{module_str}_db_user"))
        .and_then(|v| v.as_str().map(|s| s.to_string()))
        .expect("Db name doesnt exists, unhandled error");
    let db_password = unwrap_safe_store(store, &format!("{module_str}_db_password"))
        .and_then(|v| v.as_str().map(|s| s.to_string()))
        .expect("Db password doesnt exists, unhandled error");
    let db_port = unwrap_safe_store(store, &format!("{module_str}_db_port"))
        .and_then(|v| v.as_str().map(|s| s.to_string()))
        .expect("Db port doesnt exists, unhandled error");
    let db_host = unwrap_safe_store(store, &format!("{module_str}_db_host"))
        .and_then(|v| v.as_str().map(|s| s.to_string()))
        .expect("Db host doesnt exists, unhandled error");

    Ok(format!(
        "postgresql://{}:{}@{}:{}/{}",
        db_user, db_password, db_host, db_port, db_name
    ))
}
