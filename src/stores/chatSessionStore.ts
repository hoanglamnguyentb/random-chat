import { ChatSession } from '@/types/chatSession';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ChatSessionState {
  chatSession: ChatSession | null;
  setChatSession: (chat: ChatSession) => void;
  clearChatSession: () => void;
}

export const useChatSessionStore = create(
  persist<ChatSessionState>(
    (set) => ({
      chatSession: null,
      setChatSession: (chat) => set({ chatSession: chat }),
      clearChatSession: () => set({ chatSession: null }),
    }),
    { name: 'chat-session-store' }
  )
);
