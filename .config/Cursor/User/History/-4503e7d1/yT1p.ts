import { PublicRepein } from "@/models/analysis-model";
import { create } from "zustand";

interface BoundingStore {
  member: PublicRepein | null;
  band: string | null;
  setMember: (member: string) => void;
  setBand: (band: string) => void;
}

const useBounding = create<BoundingStore>((set) => ({
  member: null,
  band: null,
  setMember: (member: PublicRepein) => set({ member }),
  setBand: (band: string) => set({ band })
}));

export default useBounding;