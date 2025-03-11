import { PublicRepein, Records } from "@/models/analysis-model";
import { create } from "zustand";
import { BoundingBandModel } from "../-models/bounding-band.model";
import { BoundingRequest } from "../-models/bounding-request";

interface BoundingStore {
  member: PublicRepein | null;
  boundingBand: BoundingBandModel[] | null 
  boundingMember: Records[] | null
  band: Record<string, string> | null;
  setBoundingBand: (data: BoundingBandModel) => void;
  setMember: (member: PublicRepein) => void;
  setBand: (band: Record<string, string>) => void;
  setBoundingMember: (boundingMember: Records) => void;
  resetBoundings: () => void;
}

const useBounding = create<BoundingStore>((set) => ({
  member: null,
  band: null,
  boundingBand: [],
  boundingMember: [],
  setBoundingBand: (data: BoundingBandModel) => set((state) => {
    return { boundingBand: [...(state.boundingBand || []), data] };
  }),
  setMember: (member: PublicRepein) => set((state) => {
    if (state.boundingMember?.length && state.boundingMember.length > 0 && state.boundingBand?.length && state.boundingBand.length > 0) {
      state.resetBoundings();
    }

    return { member };
  }),
  setBand: (band: Record<string, string>) => set({ band }),
  setBoundingMember: (boundingMember: Records) => set((state) => {

    if (state.boundingMember?.some((member) => member.id === boundingMember.id)) {
      return state;    
    }

    return { boundingMember: [...(state.boundingMember || []), boundingMember] };
  }),
  resetBoundings: () => set({
    boundingBand: [],
    boundingMember: [],
  }),
}));

export const getBounding = (state: BoundingStore): BoundingRequest => {
  return {
    repein_id: state.member?.repein_id || 0,
    band_id: parseInt(state.band?.ID || '0'),
    bounding_band: state.boundingBand || [],
    repein_records: state.boundingMember || [],
  };
};

export default useBounding;

