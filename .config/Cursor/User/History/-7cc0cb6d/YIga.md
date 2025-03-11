Las array tables son un concepto fundamental en la creación del [[Proyecto SIGE]].
# 📓Definición
Una array table es un array de javascript on un vector de rust que almacena records de tablas en su interior, al estilo de un JSON.
```javascript
const arrayTable = [{name: John, job: Parent}, {name: Jane, job: Mother}]
```
Fue creada con la intención de tener mejores formularios dinámicos. **Por ejemplo:**
- Un formulario de hijos, en donde se puedan agregar y eliminar
En este caso se podria usar un hook de react-hook-form, llamado *useFieldArray*, pero en el momento que invente esta solución desconocía totalmente de el, por lo que la aplicación esta plagada de estos.
# Como se guarda?
Las array tables se guardan en el localStorage al principio de la aplicacion, cuando es momento de pasarlas hacia la base de datos 