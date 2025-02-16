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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useChatSessionStore } from '@/stores/chatSessionStore';
import { deleteChatsByUserId } from '@/services/chatSession.service';
import { useState } from 'react';

const ProfileMenu = () => {
  const { user, logout } = useAuthStore();
  const { clearChatSession, clearChatSessions } = useChatSessionStore();
  const router = useRouter();

  function handleLogout() {
    logout();
    clearChatSession();
    router.push('/pages/login');
  }

  function deleteAllChatSessions() {
    clearChatSession();
    clearChatSessions();
    if (user?.id) {
      deleteChatsByUserId(user.id);
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="w-full justify-start">
          <CircleUser />
          Xin chào, {user?.username}
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
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                <MessageCircleX />
                <span>Xoá hết cuộc hội thoại</span>
              </DropdownMenuItem>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Xóa tất cả đoạn chat?</AlertDialogTitle>
                <AlertDialogDescription>
                  Hành động này sẽ xóa <b>Tạo truy vấn dữ liệu.</b>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Huỷ bỏ</AlertDialogCancel>
                <AlertDialogAction onClick={deleteAllChatSessions}>
                  Đồng ý
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
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
