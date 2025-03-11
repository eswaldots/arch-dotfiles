---
tags:  
- linux
- aprendizaje
- electron
---
# 🥡 Contexto
Hoy estaba intentando instalar una aplicación de Electron, pero me tope con un problema recurrente, esta no tenia un instalador nativo para mi distribucion (Arch Linux).
Podia usar el AppImage, o el tar.gz, pero me gustaria tenerlo instalado de forma nativa, ya que las ventajas de tenerlo en el path son muchas.
# 🔍 En busca de una solución
Podia instalar un .desktop, pero no es lo mismo, ya que no es una aplicación nativa.

Entonces, empece a investigar y encontre una solución bastante sencilla.
# 🔍 Solución
1. **Descomprimir el paquete**:
```bash
tar -xvf nombre_aplicacion.tar.gz -C /opt/
# Si es AppImage:
chmod +x nombre_app.AppImage && ./nombre_app.AppImage --appimage-extract
mv squashfs-root/ /opt/nombre_app/
```
2. **Crear lanzador (.desktop)**:
```bash
sudo nano ~/.local/share/applications/nombre_app.desktop
```
Contenido del archivo:
```desktop
[Desktop Entry]
Name=Nombre App
Exec=/opt/nombre_app/nombre_ejecutable
Icon=/opt/nombre_app/icon.png
Type=Application
Categories=Utility;
StartupWMClass=nombre_app
```
3. **Hacerlo ejecutable**:
```bash
chmod +x ~/.local/share/applications/nombre_app.desktop
```
4. **(Opcional) Enlazar al PATH**:
```bash
sudo ln -s /opt/nombre_app/nombre_ejecutable /usr/local/bin/nombre_app
```
# ✔️ Verificación
```bash
update-desktop-database ~/.local/share/applications/
gtk-launch nombre_app.desktop  # Probar el lanzador
```
# Resultado