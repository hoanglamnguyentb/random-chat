'use client';

import { useAuthStore } from '@/hooks/authStore';
import { useChatSessionStore } from '@/hooks/chatSessionStore';
import { createChat } from '@/services/chatSession.service';
import { Chat } from '@/types/chatSession';
import { Timestamp } from 'firebase/firestore';
import type { Metadata } from 'next';
import { useState } from 'react';

export default function ChatLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, login, logout } = useAuthStore();
  const { chatSession, setChatSession, clearChatSession } =
    useChatSessionStore();

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  async function createChatSession(): Promise<void> {
    const chatSessionNew = {
      userIds: ['1', '2'],
      createdAt: Timestamp.fromDate(new Date()),
      lastActive: Timestamp.fromDate(new Date()),
    };
    const idChatSession = await createChat(chatSessionNew);

    setChatSession({ ...chatSessionNew, id: idChatSession });
    alert('Tạo thành công');
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
              <div
                className="p-2 cursor-pointer rounded-lg hover:bg-gray-200 btn-toggle-sidebar"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6 cursor-pointer"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 8.25V18a2.25 2.25 0 0 0 2.25 2.25h13.5A2.25 2.25 0 0 0 21 18V8.25m-18 0V6a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 6v2.25m-18 0h18M5.25 6h.008v.008H5.25V6ZM7.5 6h.008v.008H7.5V6Zm2.25 0h.008v.008H9.75V6Z"
                  />
                </svg>
              </div>
              <div
                className="p-2 cursor-pointer rounded-lg hover:bg-gray-200"
                onClick={createChatSession}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
                  />
                </svg>
              </div>
            </div>
            <div className="mb-auto">
              <div className="font-semibold px-2 text-sm">Today</div>
              <div className="flex justify-between p-2 hover:bg-gray-200 rounded-lg cursor-pointer">
                <div>Đoạn chat 01</div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                  />
                </svg>
              </div>
            </div>
            <div className="flex justify-between items-center h-[60px]">
              <div className="p-2 flex w-full hover:bg-gray-200 rounded-xl cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
                Xin chào, {user}
              </div>
            </div>
          </div>
        </div>
        <div className="relative flex h-full max-w-full flex-1 flex-col overflow-hidden">
          <div
            className={`absolute flex justify-between items-center h-[60px] px-3 ${
              isSidebarOpen ? 'hidden' : ''
            }`}
          >
            <div
              className="p-2 cursor-pointer rounded-lg hover:bg-gray-200 btn-toggle-sidebar"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6 cursor-pointer"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 8.25V18a2.25 2.25 0 0 0 2.25 2.25h13.5A2.25 2.25 0 0 0 21 18V8.25m-18 0V6a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 6v2.25m-18 0h18M5.25 6h.008v.008H5.25V6ZM7.5 6h.008v.008H7.5V6Zm2.25 0h.008v.008H9.75V6Z"
                />
              </svg>
            </div>
            <div>Cuộc hội thoại số{chatSession?.id}</div>
            <div className="p-2 cursor-pointer rounded-lg hover:bg-gray-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
                />
              </svg>
            </div>
          </div>
          {children}
        </div>
      </div>
    </>
  );
}
