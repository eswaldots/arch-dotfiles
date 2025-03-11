use serde_json::{Map, Value};
use sqlx::{Column, Row};

use crate::definitions::database_definitions::Database;

pub async fn get_custom_table_fields(
    pool: &Database,
    table_name: &str,
) -> Result<Vec<String>, sqlx::Error> {
    println!("Getting custom table fields for table: {}", table_name);
    let mut fields: Vec<String> = Vec::new();

    match pool {
        Database::PostgreSQL(pool) => {
            let rows = sqlx::query(
                "SELECT column_name FROM information_schema.columns WHERE table_name = $1 ORDER BY CASE WHEN column_name = 'id' THEN 0 ELSE 1 END",
            )
            .bind(table_name)
            .fetch_all(pool)
            .await?;

            println!("Got rows: {:?}", &rows);

            for row in rows {
                let field = row.get::<String, _>(0);

                fields.push(field);
            }

            println!("Successfully got fields: {:?}", &fields);

            Ok(fields)
        }

        Database::Sqlite(pool) => {
            let rows = sqlx::query(
                "SELECT name FROM pragma_table_info($1) ORDER BY CASE WHEN name = 'id' THEN 0 ELSE 1 END"
            )
            .bind(table_name)
            .fetch_all(pool)
            .await?;

            for row in rows {
                let field = row.get::<String, _>(0);

                fields.push(field);
            }

            Ok(fields)
        }
    }
}

pub async fn get_institutes(pool: &Database) -> Result<Vec<Map<String, Value>>, sqlx::Error> {
    let mut institutes: Vec<Map<String, Value>> = Vec::new();

    match pool {
        Database::PostgreSQL(pool) => {
            let query = sqlx::query("SELECT * FROM \"institutos\"")
                .fetch_all(pool)
                .await?;

            for row in query.iter() {
                let mut institute: Map<String, Value> = Map::new();

                let columns = row.columns();

                for column in columns {
                    let value = row.try_get(column.name()).unwrap_or("NULL");

                    institute.insert(column.name().to_string(), Value::String(value.to_string()));
                }

                institutes.push(institute);
            }

            Ok(institutes)
        }

        Database::Sqlite(pool) => {
            let query = sqlx::query("SELECT * FROM \"institutos\"")
                .fetch_all(pool)
                .await?;

            for row in query.iter() {
                let mut institute: Map<String, Value> = Map::new();

                let columns = row.columns();

                for column in columns {
                    let value = row.try_get(column.name()).unwrap_or("NULL");

                    institute.insert(column.name().to_string(), Value::String(value.to_string()));
                }

                institutes.push(institute);
            }

            Ok(institutes)
        }
    }
}

pub async fn get_custom_table(
    pool: &Database,
    table_name: &str,
    search_term: Option<String>,
) -> Result<Vec<Map<String, Value>>, sqlx::Error> {
    println!("Getting custom table: {}", table_name);

    let mut institutes: Vec<Map<String, Value>> = Vec::new();

    match pool {
        Database::Sqlite(pool) => {
            // Primero obtenemos los nombres de las columnas
            let columns = sqlx::query("SELECT name FROM pragma_table_info($1)")
                .bind(table_name)
                .fetch_all(pool)
                .await?;

            // Construimos la consulta dinámicamente
            let query_str = if let Some(search) = &search_term {
                let mut conditions = Vec::new();
                for row in columns.iter() {
                    let column_name = row.get::<String, _>(0);
                    conditions.push(format!("CAST(\"{column_name}\" AS TEXT) LIKE '%' || $2 || '%'"));
                }
                format!(
                    "SELECT * FROM \"{}\" WHERE {}",
                    table_name,
                    conditions.join(" OR ")
                )
            } else {
                format!("SELECT * FROM \"{}\"", table_name)
            };

            let query = if let Some(search) = &search_term {
                sqlx::query(&query_str)
                    .bind(table_name)
                    .bind(search)
                    .fetch_all(pool)
                    .await?
            } else {
                sqlx::query(&query_str)
                    .bind(table_name)
                    .fetch_all(pool)
                    .await?
            };

            for row in query.iter() {
                let mut institute: Map<String, Value> = Map::new();

                let columns = row.columns();

                for column in columns {
                    if column.name().to_lowercase() == "id" {
                        println!("Column name is ID");
                        let value = row.try_get::<i32, _>("id").unwrap_or_else(|_| {
                            println!("Warning: Could not get ID value, using 0");
                            0
                        });
                        institute.insert("ID".to_string(), Value::Number(value.into()));
                    } else {
                        println!("column name: {}", column.name());
                        // Handle non-ID fields as strings
                        let value = row
                            .try_get::<String, _>(column.name())
                            .unwrap_or_else(|_| "NULL".to_string());
                        institute.insert(column.name().to_string(), Value::String(value));
                    }
                }

                institutes.push(institute);
            }

            Ok(institutes)
        }

        Database::PostgreSQL(pool) => {
            // Primero obtenemos los nombres de las columnas
            let columns = sqlx::query(
                "SELECT column_name FROM information_schema.columns WHERE table_name = $1"
            )
            .bind(table_name)
            .fetch_all(pool)
            .await?;

            // Construimos la consulta dinámicamente
            let query_str = if let Some(search) = &search_term {
                let mut conditions = Vec::new();
                for row in columns.iter() {
                    let column_name = row.get::<String, _>(0);
                    conditions.push(format!("CAST(\"{column_name}\" AS TEXT) ILIKE '%' || $2 || '%'"));
                }
                format!(
                    "SELECT * FROM \"{}\" WHERE {}",
                    table_name,
                    conditions.join(" OR ")
                )
            } else {
                format!("SELECT * FROM \"{}\"", table_name)
            };

            let query = if let Some(search) = &search_term {
                sqlx::query(&query_str)
                    .bind(search)
                    .fetch_all(pool)
                    .await?
            } else {
                sqlx::query(&query_str)
                    .fetch_all(pool)
                    .await?
            };

            for row in query.iter() {
                let mut institute: Map<String, Value> = Map::new();

                let columns = row.columns();

                for column in columns {
                    if column.name().to_lowercase() == "id" {
                        println!("Column name is ID");
                        let value = row.get::<i32, _>("id");
                        institute.insert("ID".to_string(), Value::Number(value.into()));
                    } else {
                        let value = row.try_get(column.name()).unwrap_or("NULL");

                        institute
                            .insert(column.name().to_string(), Value::String(value.to_string()));
                    }
                }

                institutes.push(institute);
            }

            Ok(institutes)
        }
    }
}

pub async fn create_custom_row(
    pool: &Database,
    table_name: &str,
    data: String,
) -> Result<(), sqlx::Error> {
    println!("Creating custom row with raw string data: {}", data);

    let data: Value = serde_json::from_str(&data).unwrap();

    println!("Parsed data: {:?}", &data);

    let mut fields = get_custom_table_fields(pool, table_name).await?;

    println!("Removing ID field from fields: {:?}", &fields);

    if let Some(index) = fields.iter().position(|x| x.to_lowercase() == "id") {
        fields.remove(index);
    }

    println!("Fields after removing ID: {:?}", &fields);

    println!("Fields: {:?}", &fields);

    let table = format!(
        "\"{}\" ({})",
        table_name,
        &mut fields
            .iter()
            .map(|x| format!("\"{}\"", x))
            .collect::<Vec<String>>()
            .join(", ")
    );

    let query = tokio::task::spawn_blocking(move || {
        let mut query = sql_query_builder::Insert::new().insert_into(&table);

        let mut values = Vec::new();

        for field in &fields {
            if let Some(value) = data.get(field) {
                values.push(format!("'{}'", &value.as_str().unwrap()));
            }
        }

        query = query.values(&format!("( {} )", &values.join(", ")));
        query.to_string()
    })
    .await
    .map_err(|err| {
        sqlx::Error::Io(std::io::Error::new(
            std::io::ErrorKind::Other,
            format!("JoinError on async tokio task: {}", err),
        ))
    })?;

    match pool {
        Database::PostgreSQL(pool) => {
            println!("Inserting custom row with query: {}", query);
            sqlx::query(&query.to_string()).fetch_optional(pool).await?;

            Ok(())
        }

        Database::Sqlite(pool) => {
            sqlx::query(&query.to_string()).fetch_optional(pool).await?;

            Ok(())
        }
    }
}
