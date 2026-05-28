import { create } from 'zustand';
import { NewNoteData } from '../api/clientApi';
import { persist } from 'zustand/middleware';

type NoteDraftStore = {
  draft: NewNoteData;
  setDraft: (note: NewNoteData) => void;
  clearDraft: () => void;
};
const initialDraft: NewNoteData = {
  title: '',
  content: '',
  tag: 'Todo',
};

export const useNoteStore = create<NoteDraftStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (note) => set(() => ({ draft: note })),
      clearDraft: () => set(() => ({ draft: initialDraft })),
    }),
    {
      name: 'note-draft-storage',
      partialize: (state) => ({ draft: state.draft }),
    },
  ),
);
