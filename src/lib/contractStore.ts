import { create } from 'zustand';

interface ContractProgress {
  signatureCompleted: boolean;
  documentsSubmitted: boolean;
  documentsVerified: boolean;
  paymentCompleted: boolean;
}

interface ContractState {
  status: 'not_started' | 'in_progress' | 'completed' | 'on_hold';
  progress: ContractProgress;
  setStatus: (status: ContractState['status']) => void;
  setProgress: (progress: Partial<ContractProgress>) => void;
  reset: () => void;
}

const initialState = {
  status: 'in_progress' as const,
  progress: {
    signatureCompleted: false,
    documentsSubmitted: false,
    documentsVerified: false,
    paymentCompleted: false,
  },
};

export const useContractStore = create<ContractState>((set) => ({
  ...initialState,
  setStatus: (status) => set({ status }),
  setProgress: (progress) =>
    set((state) => ({
      progress: { ...state.progress, ...progress },
    })),
  reset: () => set(initialState),
}));