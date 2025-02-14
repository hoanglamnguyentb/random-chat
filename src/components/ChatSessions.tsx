import { useEffect } from 'react';
import { getChatsByUserId } from '@/services/chatSession.service';
import { useAuthStore } from '@/stores/authStore';
import { useChatSessionStore } from '@/stores/chatSessionStore';
import ChatSessionItem from './ChatSessionItem';

const ChatSessions = () => {
  const { user } = useAuthStore();
  const { chatSessions, setChatSessions } = useChatSessionStore();

  useEffect(() => {
    if (!user?.id) return;
    const fetchChatSessions = async () => {
      const allChatSessions = await getChatsByUserId(user?.id as string);
      setChatSessions(allChatSessions);
    };
    fetchChatSessions();
  }, [user]);

  return (chatSessions ?? []).map((chatSession) => (
    <ChatSessionItem item={chatSession} key={chatSession.id}></ChatSessionItem>
  ));
};

export default ChatSessions;
