---
tags:
  - aprendizaje
  - rust
fecha: 2025-03-01
estado: en progreso
---
# Mutex
El `Mutex` es un tipo de dato que permite a un hilo acceder a un recurso compartido de manera segura.

O eso es lo que dice la inteligencia artificial, pero en realidad no tengo la menor idea de que es el Mutex.
# Para que uso el Mutex entonces?
Uso el mutex en Tauri especificamente, para poder acceder a un recurso compartido y poder mutarlo correctamente.
```rust
let state = Mutex::new()
```