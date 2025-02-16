import { createChat } from '@/services/chatSession.service';
import { useAuthStore } from '@/stores/authStore';
import { useChatSessionStore } from '@/stores/chatSessionStore';
import { Timestamp } from 'firebase/firestore';
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Loader2, MessageCirclePlus } from 'lucide-react';

const CreateChatSessionButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuthStore();
  const { setChatSession, addChatSession } = useChatSessionStore();

  async function createChatSession(): Promise<void> {
    setIsLoading(true);
    const chatSessionNew = {
      userIds: [user?.id ?? '', 'Gemini'],
      createdAt: Timestamp.fromDate(new Date()),
      lastActive: Timestamp.fromDate(new Date()),
    };
    const idChatSession = await createChat(chatSessionNew);
    setChatSession({ ...chatSessionNew, id: idChatSession });
    addChatSession({ ...chatSessionNew, id: idChatSession });
    setIsLoading(false);
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={createChatSession}
      disabled={isLoading}
    >
      {isLoading ? <Loader2 className="animate-spin" /> : <MessageCirclePlus />}
    </Button>
  );
};

export default CreateChatSessionButton;
