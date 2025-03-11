import { useState } from "react";
import { cn } from "../../utils/cn";

interface ButtonProps {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

/**
 * Example component demonstrating the use of the cn utility
 * This shows how to create a flexible component with variant props
 * while allowing className overrides
 */
export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  onClick,
}: ButtonProps) {
  // Base styles that apply to all buttons
  const baseStyles = "rounded-md font-medium transition-colors focus:outline-none";
  
  // Variant-specific styles
  const variantStyles = {
    primary: "bg-primary text-white hover:bg-primary/90",
    secondary: "bg-neutral-300 text-neutral-900 hover:bg-neutral-400",
    outline: "border border-neutral-300 text-neutral-900 hover:bg-neutral-100",
  };
  
  // Size-specific styles
  const sizeStyles = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };
  
  return (
    <button
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        className // Allow overriding with custom className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

/**
 * Example page demonstrating the use of the Button component with cn utility
 */
export default function TwMergeExample() {
  const [activeTab, setActiveTab] = useState<string>("tab1");
  
  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Ejemplo de twMerge</h1>
      
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Variantes de Botones</h2>
        <div className="flex flex-wrap gap-4">
          <Button variant="primary">Primario</Button>
          <Button variant="secondary">Secundario</Button>
          <Button variant="outline">Outline</Button>
        </div>
      </section>
      
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Tamaños de Botones</h2>
        <div className="flex flex-wrap items-center gap-4">
          <Button size="sm">Pequeño</Button>
          <Button size="md">Mediano</Button>
          <Button size="lg">Grande</Button>
        </div>
      </section>
      
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Clases Personalizadas</h2>
        <div className="flex flex-wrap gap-4">
          <Button className="bg-green-500 hover:bg-green-600">
            Personalizado Verde
          </Button>
          <Button className="bg-red-500 hover:bg-red-600 rounded-full">
            Personalizado Redondeado
          </Button>
        </div>
      </section>
      
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Resolución de Conflictos</h2>
        <div className="flex flex-wrap gap-4">
          {/* La clase text-blue-500 anulará el color de texto del variant */}
          <Button variant="primary" className="text-blue-500">
            Texto Azul
          </Button>
          {/* La clase p-6 anulará el padding del size */}
          <Button size="sm" className="p-6">
            Padding Grande
          </Button>
        </div>
      </section>
      
      <section>
        <h2 className="text-xl font-semibold mb-4">Tabs con Estado</h2>
        <div className="border-b border-neutral-300">
          <div className="flex">
            {["tab1", "tab2", "tab3"].map((tab) => (
              <button
                key={tab}
                className={cn(
                  "px-4 py-2 font-medium",
                  activeTab === tab
                    ? "border-b-2 border-primary text-primary"
                    : "text-neutral-500 hover:text-neutral-900"
                )}
                onClick={() => setActiveTab(tab)}
              >
                Tab {tab.slice(-1)}
              </button>
            ))}
          </div>
        </div>
        <div className="p-4 border border-t-0 border-neutral-300 rounded-b-md">
          Contenido del Tab {activeTab.slice(-1)}
        </div>
      </section>
    </div>
  );
} 