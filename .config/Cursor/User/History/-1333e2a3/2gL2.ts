export enum Module {
  PERSONAL_MODULE = "personal",
  ANALYSIS_MODULE = "analysis",
  OPERATIONAL_MODULE = "operational",
  STORAGE_MODULE = "storage",
  TRANSPORT_MODULE = "transport"
}

export const MODULE_NAMES = {
  [Module.PERSONAL_MODULE]: "Personal",
  [Module.ANALYSIS_MODULE]: "Análisis",
  [Module.OPERATIONAL_MODULE]: "Operacional",
  [Module.STORAGE_MODULE]: "Almacenamiento",
  [Module.TRANSPORT_MODULE]: "Transporte"
} as const;
