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

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { ChatSession } from '@/types/chatSession';

const ChatSessions = () => {
  const { user } = useAuthStore();
  const { chatSessions, setChatSessions, removeChatSession, setChatSession } =
    useChatSessionStore();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
    setIsDropdownOpen(false);
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
      <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
        <DropdownMenuTrigger asChild>
          <div className="cursor-pointer">
            <Ellipsis />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuGroup>
            <Dialog>
              <DialogTrigger asChild>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  <PencilLine />
                  <span>Đổi tên</span>
                </DropdownMenuItem>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Đổi tên</DialogTitle>
                  <DialogDescription>Đổi tên cuộc hội thoại.</DialogDescription>
                </DialogHeader>
                <div className="flex items-center space-x-2">
                  <div className="grid flex-1 gap-2">
                    <Label htmlFor="link" className="sr-only">
                      Link
                    </Label>
                    <Input
                      id="link"
                      defaultValue="https://ui.shadcn.com/docs/installation"
                    />
                  </div>
                </div>
                <DialogFooter className="sm:justify-end">
                  <DialogClose asChild>
                    <Button type="button" variant="outline">
                      Huỷ bỏ
                    </Button>
                  </DialogClose>
                  <Button type="button">Đồng ý</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  <MessageCircleX className="text-red" />
                  <span className="text-red">Xoá</span>
                </DropdownMenuItem>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Xóa đoạn chat?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Hành động này sẽ xóa <b>Tạo truy vấn dữ liệu.</b>
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel onClick={() => setIsDropdownOpen(false)}>
                    Huỷ bỏ
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => removeChatSessionById(chatSession.id)}
                  >
                    Xoá
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </Button>
  ));
};

export default ChatSessions;
