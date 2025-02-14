import React, { useState } from 'react';
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
import { Button } from './ui/button';
import { ChatSession } from '@/types/chatSession';
import { useChatSessionStore } from '@/stores/chatSessionStore';
import { Ellipsis, MessageCircleX, PencilLine } from 'lucide-react';
import {
  deleteChatSessionById,
  renameChatTitle,
} from '@/services/chatSession.service';

const ChatSessionItem = ({ item }: { item: ChatSession }) => {
  const [selectedDropdownId, setSelectedDropdownId] = useState<string | null>(
    null
  );
  // const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);

  const {
    chatSession,
    removeChatSession,
    setChatSession,
    updateChatSessionTitle,
    clearChatSession,
  } = useChatSessionStore();

  const handleSetChatSession = (chatSession: ChatSession) => () => {
    setChatSession(chatSession);
  };

  const handleRenameChat = async () => {
    if (!selectedChatId || !newTitle.trim()) return;
    await renameChatTitle(selectedChatId, newTitle);
    updateChatSessionTitle(selectedChatId, newTitle); // Cập nhật store
    setNewTitle('');
    setSelectedChatId(null);
    setSelectedDropdownId(null);
    setChatSession({ ...item, title: newTitle });
  };

  function removeChatSessionById(id: string | undefined) {
    if (!id) return;
    removeChatSession(id);
    deleteChatSessionById(id);
    if (id == chatSession?.id) {
      console.log('xoá hết nhé');
      clearChatSession();
    }
  }

  return (
    <Button
      variant={`${item.id == chatSession?.id ? 'secondary' : 'ghost'}`}
      className="w-full justify-between"
      key={item.id}
      onClick={handleSetChatSession(item)}
    >
      {item?.title ?? item?.id}
      <DropdownMenu
        open={selectedDropdownId === item.id}
        onOpenChange={(isOpen) =>
          setSelectedDropdownId(isOpen ? item.id ?? null : null)
        }
      >
        <DropdownMenuTrigger asChild>
          <div className="cursor-pointer">
            <Ellipsis />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuGroup>
            <Dialog>
              <DialogTrigger asChild>
                <DropdownMenuItem
                  onSelect={(e) => {
                    e.preventDefault();
                    setSelectedChatId(item.id ?? null);
                    setNewTitle(item.title ?? '');
                  }}
                >
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
                      defaultValue={item.title}
                      onChange={(e) => setNewTitle(e.target.value)}
                    />
                  </div>
                </div>
                <DialogFooter className="sm:justify-end">
                  <DialogClose asChild>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setSelectedDropdownId(null)}
                    >
                      Huỷ bỏ
                    </Button>
                  </DialogClose>
                  <Button type="button" onClick={handleRenameChat}>
                    Đồng ý
                  </Button>
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
                  <AlertDialogCancel
                    onClick={() => setSelectedDropdownId(null)}
                  >
                    Huỷ bỏ
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => removeChatSessionById(item.id)}
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
  );
};

export default ChatSessionItem;
