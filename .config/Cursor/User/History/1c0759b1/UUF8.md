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
Las custom tables estan creadas para editar y crear tablas que ya estan pensadas en la creacion del programa