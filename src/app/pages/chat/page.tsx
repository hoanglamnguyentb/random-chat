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

type Inputs = {
  message: string;
};

export default function Chat() {
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
      <div
        className={`flex-shrink-0 h-full  bg-gray border-r ${
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
            <CreateChatSessionButton></CreateChatSessionButton>
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
          <CreateChatSessionButton></CreateChatSessionButton>
        </div>
        <div className="h-screen relative">
          <ChatSessionTitle></ChatSessionTitle>
          <div className="h-full overflow-y-auto pt-16 pb-20">
            <div className="w-8/12 flex flex-col items-center m-auto">
              <div className="w-full flex-1">
                {messages.map((msg, index) => {
                  if (msg.senderId == user?.id) {
                    return (
                      <div
                        className="flex items-center justify-end mb-3"
                        key={index}
                      >
                        <div className="bg-sky-100 rounded-xl p-2 max-w-sm">
                          {msg.content}
                        </div>
                      </div>
                    );
                  } else {
                    return (
                      <div className="flex mb-3 gap-2" key={index}>
                        <Image
                          src="https://picsum.photos/50/50"
                          width={50}
                          height={50}
                          alt="Picture of the author"
                          className="w-8 h-8 rounded-full mr-2"
                        />
                        <div className=""> {msg.content}</div>
                      </div>
                    );
                  }
                })}
                {isTyping && (
                  <div className="flex mb-3 gap-2">
                    <Image
                      src="https://picsum.photos/50/50"
                      width={50}
                      height={50}
                      alt="Picture of the author"
                      className="w-8 h-8 rounded-full mr-2"
                    />
                    <Skeleton className="h-10 w-full" />
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="text-center w-full bg-white absolute -translate-x-1/2 left-1/2 bottom-0">
            <div className="w-8/12 m-auto bg-gray-100 p-2 rounded-xl mb-3">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex items-center"
                autoComplete="off"
              >
                <input
                  className="w-full rounded-lg rounded-r-none p-2 outline-none bg-transparent"
                  type="text"
                  placeholder="Tin nhắn của bạn..."
                  {...register('message')}
                />
                <Button type="submit" className="size-8 p-2 rounded-full">
                  {isTyping ? <Loader2 className="animate-spin" /> : <Send />}
                </Button>
              </form>
            </div>
          </div>
        </div>{' '}
      </div>
    </>
  );
}
