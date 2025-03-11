use sqlx::types::time::Date;

pub fn date_to_sql(date: &str) -> Date {
    // La fecha de JavaScript en formato ISO tiene este aspecto: "2023-04-15T12:30:45.000Z"
    // Para PostgreSQL necesitamos: "2023-04-15" o "2023-04-15 12:30:45" para datetime
    
    // Verificamos si la cadena contiene 'T' (formato ISO)
    if date.contains('T') {
        // Tomamos solo la parte de la fecha (antes de la T)
        // o podemos tomar fecha y hora sin la Z final para timestamp
        let parts: Vec<&str> = date.split('T').collect();
        
        if parts.len() > 1 {
            let date_part = parts[0];
            let time_part = parts[1].split('.').next().unwrap_or("00:00:00");
            
            // Formato timestamp completo: "2023-04-15 12:30:45"
            return format!("{} {}", date_part, time_part);
        }
        
        return parts[0].to_string();
    }
    
    // Si no tiene formato ISO, devolvemos la cadena original
    // Esto podría mejorarse con validación adicional
    date.to_string()
}