# Nueva manera de manejar imágenes en SIGE usando servidor FTP

El manejo de imágenes en el [[Proyecto SIGE]] ha presentado desafíos, especialmente con el almacenamiento BYTEA en PostgreSQL. Una solución más eficiente sería implementar un servidor FTP dedicado para el almacenamiento de imágenes.

## 📋 Motivación
- Actualmente las imágenes se guardan como BYTEA en PostgreSQL, lo que:
  - Aumenta el tamaño de la base de datos
  - Dificulta la renderización en el frontend
  - Reduce el rendimiento en consultas
  - Complica la migración de datos

## 🔄 Propuesta de implementación

### Arquitectura
1. **Servidor FTP dedicado**:
   - Almacenamiento exclusivo para imágenes
   - Estructura de directorios organizada por módulos
   - Acceso seguro mediante credenciales

2. **Flujo de trabajo**:
   - Al subir una imagen desde la aplicación, se envía al servidor FTP
   - Se genera una URL o ruta única para la imagen
   - En la base de datos solo se almacena esta referencia (string)
   - El frontend renderiza la imagen usando la URL almacenada

### Ventajas
- Reduce significativamente el tamaño de la base de datos
- Mejora el rendimiento de consultas SQL
- Simplifica la renderización de imágenes en el frontend
- Facilita la gestión de backups (separando datos e imágenes)
- Permite escalabilidad independiente

### Implementación técnica

```rust
// Función en Rust para subir imagen al servidor FTP
pub fn upload_image_to_ftp(image_bytes: Vec<u8>, filename: &str) -> Result<String, AppError> {
    // Configuración FTP desde el estado de la aplicación
    let ftp_config = get_ftp_config()?;
    
    // Conexión al servidor FTP
    let mut ftp_stream = FtpStream::connect(format!("{}:{}", ftp_config.host, ftp_config.port))?;
    ftp_stream.login(&ftp_config.username, &ftp_config.password)?;
    
    // Subir archivo
    ftp_stream.put(filename, &mut Cursor::new(image_bytes))?;
    
    // Generar y devolver URL de acceso
    let image_url = format!("{}/{}", ftp_config.base_url, filename);
    Ok(image_url)
}
```

```typescript
// Componente React para mostrar imágenes desde FTP
function FtpImage({ imageUrl }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  return (
    <div className="image-container">
      {loading && <Spinner />}
      {error && <ErrorMessage message="No se pudo cargar la imagen" />}
      <img 
        src={imageUrl} 
        onLoad={() => setLoading(false)}
        onError={(e) => {
          setLoading(false);
          setError(e);
        }}
        style={{ display: loading ? 'none' : 'block' }}
      />
    </div>
  );
}
```

## 🛠️ Configuración en la aplicación
- Agregar sección en configuración para gestionar conexión FTP
- Campos necesarios:
  - Host del servidor FTP
  - Puerto
  - Usuario y contraseña
  - Directorio base
  - URL base para acceso a imágenes
- Implementar prueba de conexión

## 🔄 Migración de datos existentes
1. Extraer imágenes BYTEA de la base de datos
2. Convertirlas a archivos y subirlas al servidor FTP
3. Actualizar referencias en la base de datos
4. Implementar script de migración automatizado

## 🔒 Consideraciones de seguridad
- Usar FTPS (FTP sobre SSL) para transferencia segura
- Implementar autenticación robusta
- Restringir permisos de escritura/lectura según roles
- Considerar firewalls y reglas de acceso

Esta solución permitirá un manejo más eficiente de las imágenes en SIGE, mejorando el rendimiento general y facilitando el mantenimiento del sistema. 