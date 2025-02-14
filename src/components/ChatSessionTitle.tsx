import { useChatSessionStore } from '@/stores/chatSessionStore';
import React, { useEffect } from 'react';
import { Trash } from 'lucide-react';
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
import { Button } from '@/components/ui/button';
import { deleteChatSessionById } from '@/services/chatSession.service';

const ChatSessionTitle = () => {
  const { chatSession, removeChatSession, clearChatSession } =
    useChatSessionStore();

  function removeChatSessionById(id: string | undefined) {
    if (!id) return;
    removeChatSession(id);
    deleteChatSessionById(id);
    clearChatSession();
  }

  useEffect(() => {
    console.log('🟢 ChatSession thay đổi:', chatSession);
  }, [chatSession]);

  return (
    <>
      {chatSession && (
        <div className="text-center p-3 bg-white w-full flex gap-2 items-center justify-center absolute top-0 -translate-x-1/2 left-1/2 backdrop-blur">
          Cuộc hội thoại
          <span className="underline">
            {chatSession?.title ?? chatSession?.id}
          </span>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Trash />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Xóa đoạn chat?</AlertDialogTitle>
                <AlertDialogDescription>
                  Hành động này sẽ xóa <b>Tạo truy vấn dữ liệu.</b>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Huỷ bỏ</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => removeChatSessionById(chatSession.id)}
                >
                  Xoá
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <div className="w-full h-[50px] absolute bottom-[-50px] bg-gradient-to-b from-white to-white-0"></div>
        </div>
      )}
    </>
  );
};

export default ChatSessionTitle;
