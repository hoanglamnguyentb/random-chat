'use client';

import { useAuthStore } from '@/stores/authStore';
import { useChatSessionStore } from '@/stores/chatSessionStore';
import { createChat } from '@/services/chatSession.service';
import { Chat } from '@/types/chatSession';
import { Timestamp } from 'firebase/firestore';
import type { Metadata } from 'next';
import { useState } from 'react';
import ProfileMenu from '@/components/ProfileMenu';
import { Button } from '@/components/ui/button';
import { AppWindow, Ellipsis, MessageCirclePlus } from 'lucide-react';
import ChatSessions from '@/components/ChatSessions';

export default function ChatLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, login, logout } = useAuthStore();
  const { chatSession, setChatSession, addChatSession } = useChatSessionStore();

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  async function createChatSession(): Promise<void> {
    const chatSessionNew = {
      userIds: [user?.id ?? '', 'Gemini'],
      createdAt: Timestamp.fromDate(new Date()),
      lastActive: Timestamp.fromDate(new Date()),
    };
    const idChatSession = await createChat(chatSessionNew);

    setChatSession({ ...chatSessionNew, id: idChatSession });
    addChatSession({ ...chatSessionNew, id: idChatSession });
  }

  return (
    <>
      <div className="flex h-screen">
        <div
          className={`flex-shrink-0 h-full  bg-gray-50 ${
            isSidebarOpen ? 'w-[260px]' : 'w-0 overflow-hidden'
          }`}
        >
          <div className="flex flex-col h-full px-3">
            <div className="flex justify-between items-center h-[60px]">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              >
                <AppWindow />
              </Button>
              <Button variant="ghost" size="icon" onClick={createChatSession}>
                <MessageCirclePlus />
              </Button>
            </div>
            <div className="mb-auto">
              <div className="font-semibold px-2 text-sm">Today</div>
              <ChatSessions></ChatSessions>
            </div>
            <div className="flex justify-between items-center h-[60px]">
              <ProfileMenu></ProfileMenu>
            </div>
          </div>
        </div>
        <div className="relative flex h-full max-w-full flex-1 flex-col overflow-hidden">
          <div
            className={`absolute z-10 flex justify-between items-center h-[60px] px-3 ${
              isSidebarOpen ? 'hidden' : ''
            }`}
          >
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <AppWindow />
            </Button>
            <Button variant="ghost" size="icon" onClick={createChatSession}>
              <MessageCirclePlus />
            </Button>
          </div>
          {children}
        </div>
      </div>
    </>
  );
}
