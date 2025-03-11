import { PublicRepein, Records } from "@/models/analysis-model";
import { create } from "zustand";
import { BoundingBandModel } from "../-models/bounding-band.model";

interface BoundingStore {
  member: PublicRepein | null;
  boundingBand: BoundingBandModel[] | null 
  boundingMember: Records[] | null
  band: string | null;
  setBoundingBand: (data: BoundingBandModel) => void;
  setMember: (member: PublicRepein) => void;
  setBand: (band: string) => void;
  setBoundingMember: (boundingMember: Records[]) => void;
}

const useBounding = create<BoundingStore>((set) => ({
  member: null,
  band: null,
  boundingBand: [],
  boundingMember: [],
  setBoundingBand: (data: BoundingBandModel) => set((state) => {
    return { boundingBand: [...(state.boundingBand || []), data] };
  }),
  setMember: (member: PublicRepein) => set({ member }),
  setBand: (band: string) => set({ band }),
  setBoundingMember: (boundingMember: Records[]) => set((state) => {
    return { boundingMember: [...(state.boundingMember || []), ...boundingMember] };
  }),
}));

export default useBounding;