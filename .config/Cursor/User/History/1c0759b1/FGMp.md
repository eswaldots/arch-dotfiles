---
tags:
  - aprendizaje
  - proyecto
  - idea
estado: en progreso
fecha: 2025-03-04
---
Este es un concepto utilizado en el [[Proyecto SIGE]] para poder darle mas libertad al product owner.

Las custom tables son tablas sql que se crean desde el mismo programa, sin tener que recurrir a codigo sql.

Esto puede hacer que se creen tablas muy facilmente en cuestion de segundos. Permitiendote pensar mas en la logica de negocio sin tener que frenarte en otras cuestiones.
# Desventajas principales
Tiene muchas desventajas esta forma de pensar, pero aun asi te da mucha rapidez a la hora de sacar nuevas novedades.

- El programa es mas propenso a fallar.

- Varios casos de usos en el programa pueden verse afectados debido a cambios en las columnas de estas, creando errores muy faciles de solucionar pero de una precedencia no tan facil de hallar.

- Hace la programacion en Rust mucho mas compleja, ya que este siempre te obliga a tipar todos los resultados, al no saber exactamente los resultados de estas tablas, las cosas con el compilador de rust se pueden poner muy complejas.
# Pensamiento inicial
Las custom tables estan creadas para editar y crear tablas que ya estan pensadas en la creacion del programa.

Tal vez pueda sonar confuso, pero en pocas palabras *No se crean tablas a lo loco, las tablas ya estan definidas en la ui del programa, solo se necesita crear la tabla sql para que el programa las maneje*.

# Actualizacion: Un paso mas de complejidad.
Ahora necesitamos que las custom tables sean relaciones, queriendo decir que algunos tipos de datos se tienen que actualizar y hacer referencia a otros.
### Por ejemplo

Creamos una custom table llamemosla _banda_, esta tabla necesita un campo que se llame _parroquia_, pero este campo de parroquia tiene que hacer referencia a la custom table de _parroquia_, especificamente a el nombre de parroquia.

De esta manera en el formulario de la custom table, habra un select que haga un fetch de los nombres de las parroquias, relacionandolas asi facilmente.