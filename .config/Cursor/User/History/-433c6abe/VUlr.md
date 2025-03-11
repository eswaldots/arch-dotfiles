# Utilidades de Estilo

## `cn` - Utilidad para combinar clases de Tailwind

Esta utilidad permite combinar clases de Tailwind CSS de manera eficiente, resolviendo conflictos entre clases y proporcionando una sintaxis clara para aplicar estilos condicionales.

### Configuración

La utilidad `cn` utiliza `tailwind-merge` con una configuración personalizada que incluye:

- Soporte para las animaciones personalizadas definidas en el proyecto (`openSelect`, `slideInRight`, `slideOutRight`)
- Resolución automática de conflictos entre clases de Tailwind

### Uso básico

```tsx
import { cn } from "@/utils/cn";

// Combinación simple de clases
<div className={cn("text-primary bg-neutral-100 p-4")}>
  Contenido
</div>

// Clases condicionales
<button 
  className={cn(
    "px-4 py-2 rounded-md",
    isActive ? "bg-primary text-white" : "bg-neutral-300 text-neutral-700"
  )}
>
  Botón
</button>

// Con sintaxis de objeto
<input 
  className={cn({
    "border-red-500": hasError,
    "border-green-500": isValid,
    "border-neutral-300": !hasError && !isValid
  }, "p-2 rounded-md")}
/>
```

### Ventajas

1. **Resolución de conflictos**: Cuando se aplican múltiples clases que afectan la misma propiedad, `cn` asegura que solo se aplique la última.

   ```tsx
   // Solo se aplicará "text-white"
   cn("text-primary", "text-white")
   ```

2. **Soporte para expresiones condicionales**: Facilita la aplicación de estilos basados en condiciones.

3. **Integración con animaciones personalizadas**: Las animaciones definidas en `tailwind.config.js` están configuradas para funcionar correctamente con esta utilidad.

### Recomendaciones

- Utiliza `cn` en todos los componentes para mantener consistencia en el manejo de clases
- Agrupa las clases por categoría (layout, colores, espaciado, etc.) para mejorar la legibilidad
- Para animaciones complejas, considera usar `tailwind-motion` junto con esta utilidad 