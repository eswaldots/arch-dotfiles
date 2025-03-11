use sqlx::types::time::Date;

pub fn date_to_sql(date: &str) -> Date {
    // La fecha de JavaScript en formato ISO tiene este aspecto: "2023-04-15T12:30:45.000Z"

    Date::parse_from_str(date, "%Y-%m-%d").unwrap()
}