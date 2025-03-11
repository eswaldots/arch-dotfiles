use sqlx::types::time::{Date, PrimitiveDateTime, Time};

pub fn date_to_sql(date: &str) -> sqlx::types::time::PrimitiveDateTime {
    // La fecha de JavaScript en formato ISO tiene este aspecto: "2023-04-15T12:30:45.000Z"
    // Para PostgreSQL necesitamos convertirla a un tipo DateTime de sqlx
    
    // Verificamos si la cadena contiene 'T' (formato ISO)
    if date.contains('T') {
        // Tomamos la parte de la fecha y la hora
        let parts: Vec<&str> = date.split('T').collect();
        
        if parts.len() > 1 {
            let date_part = parts[0];
            let time_part = parts[1].split('.').next().unwrap_or("00:00:00");
            
            // Parseamos la fecha
            let date_components: Vec<&str> = date_part.split('-').collect();
            let year = date_components[0].parse::<i32>().unwrap_or(2000);
            let month = date_components[1].parse::<u8>().unwrap_or(1);
            let day = date_components[2].parse::<u8>().unwrap_or(1);
            
            // Parseamos la hora
            let time_components: Vec<&str> = time_part.split(':').collect();
            let hour = time_components[0].parse::<u8>().unwrap_or(0);
            let minute = time_components[1].parse::<u8>().unwrap_or(0);
            let second = time_components[2].parse::<u8>().unwrap_or(0);
            
            // Creamos los objetos Date y Time
            let sql_date = Date::from_calendar_date(year, month.try_into().unwrap_or(1.into()), day).unwrap_or_else(|_| Date::from_calendar_date(2000, Month::January, 1).unwrap());
            let sql_time = Time::from_hms(hour, minute, second).unwrap_or_else(|_| Time::from_hms(0, 0, 0).unwrap());
            
            // Retornamos el PrimitiveDateTime
            return PrimitiveDateTime::new(sql_date, sql_time);
        }
    }
}