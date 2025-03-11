use sqlx::types::chrono::{DateTime, Utc};
use sqlx::{Pool, Postgres, Sqlite};

#[derive(Clone)]
pub enum Database {
    Sqlite(Pool<Sqlite>),
    PostgreSQL(Pool<Postgres>),
}

#[derive(sqlx::FromRow)]
pub struct Metadata {
    pub key: String,
}

#[derive(sqlx::FromRow)]
pub struct User {
    pub user_id: Option<i32>,
    pub user_name: String,
    pub password: String,
    pub email: String,
    pub session_id: Option<String>,
    pub session_expires_at: Option<DateTime<Utc>>,
}
