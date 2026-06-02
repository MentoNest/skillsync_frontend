'use client';

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { Mentor } from '@/lib/types/mentor';

interface MentorSelectionContextType {
  selectedMentors: Mentor[];
  toggleMentor: (mentor: Mentor) => void;
  isSelected: (mentorId: number) => boolean;
  clearSelection: () => void;
  removeMentor: (mentorId: number) => void;
}

const MentorSelectionContext = createContext<MentorSelectionContextType | undefined>(undefined);

const MAX_SELECTION = 3;

export function MentorSelectionProvider({ children }: { children: ReactNode }) {
  const [selectedMentors, setSelectedMentors] = useState<Mentor[]>([]);

  const toggleMentor = useCallback((mentor: Mentor) => {
    setSelectedMentors(prev => {
      const exists = prev.find(m => m.id === mentor.id);
      if (exists) {
        return prev.filter(m => m.id !== mentor.id);
      }
      if (prev.length >= MAX_SELECTION) {
        return prev;
      }
      return [...prev, mentor];
    });
  }, []);

  const isSelected = useCallback((mentorId: number) => {
    return selectedMentors.some(m => m.id === mentorId);
  }, [selectedMentors]);

  const clearSelection = useCallback(() => {
    setSelectedMentors([]);
  }, []);

  const removeMentor = useCallback((mentorId: number) => {
    setSelectedMentors(prev => prev.filter(m => m.id !== mentorId));
  }, []);

  return (
    <MentorSelectionContext.Provider
      value={{ selectedMentors, toggleMentor, isSelected, clearSelection, removeMentor }}
    >
      {children}
    </MentorSelectionContext.Provider>
  );
}

export function useMentorSelection() {
  const context = useContext(MentorSelectionContext);
  if (!context) {
    throw new Error('useMentorSelection must be used within MentorSelectionProvider');
  }
  return context;
}
