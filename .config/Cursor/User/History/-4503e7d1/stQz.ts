import { PublicRepein } from "@/models/analysis-model";
import { create } from "zustand";
import { BoundingBandForm } from "../-models/bounding-band.model";

interface BoundingStore {
  member: PublicRepein | null;
  boundingBand: BoundingBandForm | null 
  band: string | null;
  setMember: (member: PublicRepein) => void;
  setBand: (band: string) => void;
}

const useBounding = create<BoundingStore>((set) => ({
  member: null,
  band: null,
  setMember: (member: PublicRepein) => set({ member }),
  setBand: (band: string) => set({ band })
}));

export default useBounding;