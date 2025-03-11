import { Records } from "@/models/analysis-model";
import { BoundingBandModel } from "./bounding-band.model";

export interface BoundingRequest {
  repein_id: number;
  band_id: number;
  bounding_band: BoundingBandModel[];
  repein_records: Records[];
}
