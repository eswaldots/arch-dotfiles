import { STATUS_OPTIONS } from "../../-constants"

export type Status = typeof STATUS_OPTIONS 

export interface StatusModel {
  status: StatusModel;
  date: string;
  verifier_phone: string;
  verifier_name: string;
  observations: string;
}