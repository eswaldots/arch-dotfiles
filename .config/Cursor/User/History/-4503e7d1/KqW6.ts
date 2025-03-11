import { PublicRepein } from "@/models/analysis-model";
import { create } from "zustand";
import { BoundingBandModel } from "../-models/bounding-band.model";

interface BoundingStore {
  member: PublicRepein | null;
  boundingBand: BoundingBandModel[] | null 
  boundingPerson: string | null;
  band: string | null;
  setBoundingBand: (data: BoundingBandModel) => void;
  setMember: (member: PublicRepein) => void;
  setBand: (band: string) => void;
  setBondingPerson: (bondingPerson: string) => void;
}

const useBounding = create<BoundingStore>((set) => ({
  member: null,
  band: null,
  boundingBand: [],
  boundingPerson: null,
  setBoundingBand: (data: BoundingBandModel) => set((state) => {
    return { boundingBand: [...(state.boundingBand || []), data] };
  }),
  setMember: (member: PublicRepein) => set({ member }),
  setBand: (band: string) => set({ band }),
  setBondingPerson: (boundingPerson: string) => set({ boundingPerson }),
}));

export default useBounding;