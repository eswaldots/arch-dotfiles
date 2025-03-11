import { PublicRepein } from "@/models/analysis-model";
import { create } from "zustand";
import { BoundingBandModel } from "../-models/bounding-band.model";

interface BoundingStore {
  member: PublicRepein | null;
  boundingBand: BoundingBandModel | null 
  bondingPerson: string | null;
  band: string | null;
  setBoundingBand: (data: BoundingBandModel) => void;
  setMember: (member: PublicRepein) => void;
  setBondingBand: (bondingband: string) => void;
  setBand: (band: string) => void;
  setBondingPerson: (bondingPerson: string) => void;

}

const useBounding = create<BoundingStore>((set) => ({
  member: null,
  band: null,
  boundingBand: null,
  setBoundingBand: (data: BoundingBandModel) => set({ boundingBand: data }),
  setMember: (member: PublicRepein) => set({ member }),
  setBand: (band: string) => set({ band }),
  setBondingPerson: (bondingPerson: string) => set({ bondingPerson }),
}));

export default useBounding;