import { ChatSession } from '@/types/chatSession';
import { create } from 'zustand';

interface ChatSessionState {
  chatSession: ChatSession | null;
  setChatSession: (chat: ChatSession) => void;
  clearChatSession: () => void;
}

export const useChatSessionStore = create<ChatSessionState>((set) => ({
  chatSession: null,
  setChatSession: (chat) => set({ chatSession: chat }),
  clearChatSession: () => set({ chatSession: null }),
}));
