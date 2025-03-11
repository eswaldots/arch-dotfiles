const MODULES = {
  PERSONAL_MODULE: "personal",
  ANALYSIS_MODULE: "analysis",
  OPERATIONAL_MODULE: "operational",
  STORAGE_MODULE: "storage",
  TRANSPORT_MODULE: "transport"
} as const;

export type Module = (typeof MODULES)[keyof typeof MODULES];

export const {
  PERSONAL_MODULE,
  ANALYSIS_MODULE,
  OPERATIONAL_MODULE,
  STORAGE_MODULE,
  TRANSPORT_MODULE
} = MODULES;

export enum Module {
  PERSONAL_MODULE,
  ANALYSIS_MODULE,
  OPERATIONAL_MODULE,
  STORAGE_MODULE,
  TRANSPORT_MODULE
}