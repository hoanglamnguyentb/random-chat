import { ChatSession } from '@/types/chatSession';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ChatSessionState {
  //Đoạn chat đang chat
  chatSession: ChatSession | null;
  setChatSession: (chat: ChatSession) => void;
  addChatSession: (chat: ChatSession) => void;
  clearChatSession: () => void;

  //Tất cả đoạn chat
  chatSessions: ChatSession[] | null;
  setChatSessions: (chat: ChatSession[]) => void;
  removeChatSession: (chatId: string) => void;
  clearChatSessions: () => void;
  updateChatSessionTitle: (id: string, newTitle: string) => void;
}

export const useChatSessionStore = create(
  persist<ChatSessionState>(
    (set) => ({
      chatSession: null,
      setChatSession: (chat) => set({ chatSession: chat }),
      clearChatSession: () => set({ chatSession: null }),

      addChatSession: (newChat) =>
        set((state) => ({
          chatSessions: state.chatSessions
            ? [newChat, ...state.chatSessions]
            : [newChat],
        })),

      updateChatSessionTitle: (id, newTitle) =>
        set((state) => ({
          chatSessions: state.chatSessions
            ? state.chatSessions.map((chat) =>
                chat.id === id ? { ...chat, title: newTitle } : chat
              )
            : null,
        })),

      chatSessions: null,
      setChatSessions: (chat) => set({ chatSessions: chat }),
      clearChatSessions: () => set({ chatSessions: null }),
      removeChatSession: (chatId) =>
        set((state) => ({
          chatSessions: state.chatSessions
            ? state.chatSessions.filter((chat) => chat.id !== chatId)
            : null,
        })),
    }),
    { name: 'chat-session-store' }
  )
);
