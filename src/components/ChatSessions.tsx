import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import {
  Ellipsis,
  MessageCircleX,
  PencilLine,
  UserRoundIcon,
} from 'lucide-react';
import {
  deleteChatSessionById,
  getChatsByUserId,
} from '@/services/chatSession.service';
import { useAuthStore } from '@/stores/authStore';
import { useChatSessionStore } from '@/stores/chatSessionStore';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChatSession } from '@/types/chatSession';

const ChatSessions = () => {
  const { user } = useAuthStore();
  const { chatSessions, setChatSessions, removeChatSession, setChatSession } =
    useChatSessionStore();

  useEffect(() => {
    if (!user?.id) return;
    const fetchChatSessions = async () => {
      const allChatSessions = await getChatsByUserId(user?.id as string);
      setChatSessions(allChatSessions);
    };
    fetchChatSessions();
  }, [user]);

  function removeChatSessionById(id: string | undefined) {
    if (!id) return;
    removeChatSession(id);
    deleteChatSessionById(id);
  }

  const handleSetChatSession = (chatSession: ChatSession) => () => {
    setChatSession(chatSession);
  };

  return (chatSessions ?? []).map((chatSession, index) => (
    <Button
      variant="ghost"
      className="w-full justify-between"
      key={index}
      onClick={handleSetChatSession(chatSession)}
    >
      {chatSession?.id}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="cursor-pointer">
            <Ellipsis />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <PencilLine />
              <span>Đổi tên</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => removeChatSessionById(chatSession.id)}
            >
              <MessageCircleX className="text-red" />
              <span className="text-red">Xoá</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </Button>
  ));
};

export default ChatSessions;
