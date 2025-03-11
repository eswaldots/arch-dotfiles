import { convertFileSrc } from "@tauri-apps/api/core";
import { load } from "@tauri-apps/plugin-store";
import { Module } from "@/constants/modules";

export const getWallpaper = async (module: Module) => {
  const store = await load("settings.json");

  const imagePath = (await store.get(`${module}_wallpaper`)) as string | null;

  if (!imagePath) return "/wallpaper.png";

  const imagePathConverted = convertFileSrc(imagePath);

  return imagePathConverted;
};
