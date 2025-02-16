import { useEffect } from 'react';
import { getChatsByUserId } from '@/services/chatSession.service';
import { useAuthStore } from '@/stores/authStore';
import { useChatSessionStore } from '@/stores/chatSessionStore';
import ChatSessionItem from './ChatSessionItem';
import { Skeleton } from './ui/skeleton';

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

  return (
    <div>
      {(chatSessions ?? []).length > 0 ? (
        chatSessions?.map((chatSession) => (
          <ChatSessionItem item={chatSession} key={chatSession.id} />
        ))
      ) : (
        <div>
          <Skeleton className="h-9 w-full my-1" />
          <Skeleton className="h-9 w-full my-1" />
          <Skeleton className="h-9 w-full my-1" />
          <Skeleton className="h-9 w-full my-1" />
          <Skeleton className="h-9 w-full my-1" />
        </div>
      )}
    </div>
  );
};

export default ChatSessions;
