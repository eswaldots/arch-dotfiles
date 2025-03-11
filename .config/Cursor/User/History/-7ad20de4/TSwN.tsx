import Button from "@/components/buttons/button";
import createWindow from "@/services/window.service";

export default function Createprofession() {
  const handleClick = async () => {
    await createWindow({
      title: "Crear profesion",
      url: "/personal/archive/profession/create",
      width: 353,
      decorations: false,
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
      Crear Profesion
    </Button>
  );
}
