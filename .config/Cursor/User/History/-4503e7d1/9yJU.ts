import { PublicRepein } from "@/models/analysis-model";
import { create } from "zustand";
import { BoundingBandForm } from "../-models/bounding-band.model";

interface BoundingStore {
  member: PublicRepein | null;
  boundingBand: BoundingBandForm | null 
  band: string | null;
  setBoundingBand: (data: BoundingBandForm) => void;
  setMember: (member: PublicRepein) => void;
  setBand: (band: string) => void;
}

const useBounding = create<BoundingStore>((set) => ({
  member: null,
  band: null,
  boundingBand: null,
  setBoundingBand: (data: BoundingBandForm) => set({ boundingBand: data }),
  setMember: (member: PublicRepein) => set({ member }),
  setBand: (band: string) => set({ band })
}));

export default useBounding;