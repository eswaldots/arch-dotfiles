import Button from "@/components/buttons/button";
import createWindow from "@/services/window.service";

export default function CreateMunicipality() {
  const handleClick = async () => {
    await createWindow({
      title: "Crear Municipios",
      url: "/analysis/archive/municipality/create",
      width: 353,
      decorations: false,
      center: true,
      height: 444,
      resizable: false,
      maximizable: false,
      minimizable: false,
      x: 0,
      y: 0
    });
  };

  return (
    <Button
      onClick={handleClick}
      className="flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-neutral-700"
    >
      Crear municipio
    </Button>
  );
}
