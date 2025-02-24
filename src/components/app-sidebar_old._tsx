import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import {
  createChat,
  deleteChatSessionById,
  getChatsByUserId,
} from '@/services/chatSession.service';
import { useAuthStore } from '@/stores/authStore';
import { useChatSessionStore } from '@/stores/chatSessionStore';
import { ChatSession } from '@/types/chatSession';
import { useEffect } from 'react';
import { Button } from './ui/button';
import {
  ChevronDown,
  ChevronUp,
  Ellipsis,
  MessageCirclePlus,
  MessageCircleX,
  PencilLine,
  User2,
} from 'lucide-react';
import { Timestamp } from 'firebase/firestore';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';

export function AppSidebar() {
  const { user } = useAuthStore();
  const {
    chatSession,
    chatSessions,
    setChatSessions,
    addChatSession,
    removeChatSession,
    setChatSession,
  } = useChatSessionStore();

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
    <Sidebar>
      <SidebarHeader>
        {/* <div className="text-end">
          <Button variant="ghost" size="icon" onClick={createChatSession}>
            <MessageCirclePlus />
          </Button>
        </div> */}
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  Select Workspace
                  <ChevronDown className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[--radix-popper-anchor-width]">
                <DropdownMenuItem>
                  <span>Acme Inc</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Acme Corp.</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Today</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {chatSessions?.map((item, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton asChild>
                    <div className="flex items-center justify-between w-full">
                      <span>{item.id}</span>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <div className="cursor-pointer">
                            <Ellipsis className="size-4" />
                          </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuGroup>
                            <DropdownMenuItem>
                              <PencilLine />
                              <span>Đổi tên</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => removeChatSessionById(item.id)}
                            >
                              <MessageCircleX className="text-red" />
                              <span className="text-red">Xoá</span>
                            </DropdownMenuItem>
                          </DropdownMenuGroup>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 /> Username
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem>
                  <span>Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Billing</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
