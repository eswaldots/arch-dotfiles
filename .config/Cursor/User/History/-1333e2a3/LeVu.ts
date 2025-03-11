export enum Module {
  PERSONAL = "personal",
  ANALYSIS = "analysis",
  OPERATIONAL = "operational",
  STORAGE = "storage",
  TRANSPORT = "transport"
}

export const MODULE_NAMES = {
  [Module.PERSONAL]: "Personal",
  [Module.ANALYSIS]: "Análisis",
  [Module.OPERATIONAL]: "Operacional",
  [Module.STORAGE]: "Almacenamiento",
  [Module.TRANSPORT]: "Transporte"
} as const;
