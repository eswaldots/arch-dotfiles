---
tags:
  - idea
  - en-desarrollo
---
Esta es una idea de [[Proyecto SIGE]] para poder usar bases de datos diferentes en cada módulo.
# 💡Idea
En rust se carga la base de datos al empezar el programa, esto se logra mediante una función de setup.

Sin embargo, tengo otra idea mejor.

Cuando la pool a la base de datos es guardada en el estado compartido de la aplicación en rust, este quedará ahí, capaz de ser modificable.
# Solución
Cada vez que el usuario cambie de módulo, de forma asincrona un componente llamara un servicio en rust que cambiara el estado de la aplicación, así guardando el nuevo cliente.
### UI bondaries
El programa puede mostrar un toast en donde al cambiar de base de datos este muestre como esta cargando el nuevo cliente, si hay un error mostrar un error toast, de lo contrario un toast de logrado.
# Configuración
En configuración se puede mostrar un mensaje informativo diciendo que cada modulo tiene una base de datos y un wallpaper diferente, que sea amarillo, cuando se cierre nunca más aparecerá.