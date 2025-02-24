'use client';
import ChatSessionTitle from '@/components/ChatSessionTitle';
import { Button } from '@/components/ui/button';
import { generateAIResponse } from '@/services/gemini.service';
import {
  createMessage,
  getMessagesBySessionId,
} from '@/services/message.service';
import { useAuthStore } from '@/stores/authStore';
import { useChatSessionStore } from '@/stores/chatSessionStore';
import { Message } from '@/types/message';
import { Timestamp } from 'firebase/firestore';
import { Loader2, Send } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import ProfileMenu from '@/components/ProfileMenu';
import { AppWindow } from 'lucide-react';
import ChatSessions from '@/components/ChatSessions';
import CreateChatSessionButton from '@/components/CreateChatSessionButton';
import { Skeleton } from '@/components/ui/skeleton';
import StartChat from '@/components/StartChat';
import { AppSidebar } from '@/components/app-sidebar';
import HomeButton from '@/components/HomeButton';

type Inputs = {
  message: string;
};

export default function Home() {
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const { user } = useAuthStore();
  const { chatSession } = useChatSessionStore();
  useEffect(() => {
    if (!chatSession?.id) return;
    const fetchMessages = async () => {
      const allMessages = await getMessagesBySessionId(
        chatSession.id as string
      );
      setMessages(allMessages);
    };

    fetchMessages();
  }, [chatSession?.id]);

  const { register, handleSubmit, reset } = useForm<Inputs>();

  const handleUserMessage = async (text: string) => {
    const userMessage: Message = {
      chatSessionId: chatSession?.id as string,
      senderId: user?.id as string,
      content: text,
      createdAt: Timestamp.fromDate(new Date()),
    };

    setMessages((prev) => [...prev, userMessage]);
    await createMessage(userMessage);
  };

  const handleAIResponse = async (text: string) => {
    setIsTyping(true);
    const responseText = await generateAIResponse(text);
    const aiMessage: Message = {
      chatSessionId: chatSession?.id as string,
      senderId: 'AI',
      content: responseText,
      createdAt: Timestamp.fromDate(new Date()),
    };

    setMessages((prev) => [...prev, aiMessage]);
    await createMessage(aiMessage);
    setIsTyping(false);
  };

  const onSubmit: SubmitHandler<Inputs> = async ({ message }) => {
    if (!message.trim() || !chatSession?.id || !user?.id) return;

    await handleUserMessage(message);
    reset(); // Reset input sau khi gửi

    await handleAIResponse(message);
  };

  return (
    <>
      <AppSidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
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
          <HomeButton></HomeButton>
        </div>
        <div className="h-screen relative">
          <StartChat></StartChat>
        </div>
      </div>
    </>
  );
}
