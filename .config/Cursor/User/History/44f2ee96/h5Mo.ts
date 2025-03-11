import { BoundingBandModel } from "../bounding-band/-models/bounding-band-model";

export interface BoundingRequest {
  repein_id: number;
  band_id: number;
  bounding_band: BoundingBandModel[];
}
