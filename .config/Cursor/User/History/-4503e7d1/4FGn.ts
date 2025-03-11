import { PublicRepein } from "@/models/analysis-model";
import { create } from "zustand";
import { BoundingBandModel } from "../-models/bounding-band.model";
import { BoundingMemberModel } from "../-models/bounding-member.model";

interface BoundingStore {
  member: PublicRepein | null;
  boundingBand: BoundingBandModel[] | null 
  boundingMember: BoundingMemberModel[] | null
  band: string | null;
  setBoundingBand: (data: BoundingBandModel) => void;
  setMember: (member: PublicRepein) => void;
  setBand: (band: string) => void;
  setBoundingMember: (boundingMember: BoundingMemberModel) => void;
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
  setBoundingMember: (boundingMember: BoundingMemberModel) => set((state) => {
    return { boundingMember: [...(state.boundingMember || []), boundingMember] };
  }),
}));

export default useBounding;