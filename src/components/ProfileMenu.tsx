import { useAuthStore } from '@/stores/authStore';
import {
  CircleUser,
  Ghost,
  LogOut,
  MessageCircleX,
  Settings,
  User,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useChatSessionStore } from '@/stores/chatSessionStore';
import { deleteChatsByUserId } from '@/services/chatSession.service';

const ProfileMenu = () => {
  const { user, logout } = useAuthStore();
  const { clearChatSession } = useChatSessionStore();
  const router = useRouter();

  function handleLogout() {
    logout();
    clearChatSession();
    router.push('/pages/login');
  }

  function deleteAllChatSessions() {
    clearChatSession();
    if (user?.id) {
      deleteChatsByUserId(user.id);
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="w-full justify-start">
          <CircleUser />
          Xin chào, {user?.username} - {user?.id}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User />
            <span>Thông tin tài khoản</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings />
            <span>Cài đặt</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={deleteAllChatSessions}>
            <MessageCircleX />
            <span>Xoá hết cuộc hội thoại</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut />
          <span>Đăng xuất</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileMenu;
