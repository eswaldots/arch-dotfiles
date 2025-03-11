Le pregunte a la inteligencia artificial sobre lo que pensaba sobre mi manera de manejar errores en el [[Proyecto SIGE]], obviamente piensa que es un asco total (actualmente lo es pues). Dio algunos puntos claves de como mejorarla, que son bastante diferentes a como lo uso.
# Un global error handler.
*Si lo pensamos, los tipos de errores que puede tener la aplicacion no son tantos.*

Si pensamos de esa manera podemos crear un enum global con `thiserror`, que pueda manejar
todos los tipos de errores de la aplicacion, ya que por mas que sean varios, los tipos de errores se comparten en toda la aplicacion.
```rust
use thiserror::Error

#[derive(Error, Debug)]
pub enum AppError {
	#[error("Failed to connect to database: {0}")]
    DatabaseError(#[from] sqlx::Error),
    #[error("Failed to parse configuration: {0}")]
    ConfigurationError(#[from] tauri_plugin_store::Error)
}
```