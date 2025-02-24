import { AppWindow } from 'lucide-react';
import { Button } from './ui/button';
import CreateChatSessionButton from './CreateChatSessionButton';
import ChatSessions from './ChatSessions';
import ProfileMenu from './ProfileMenu';
import HomeButton from './HomeButton';

interface AppSidebarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (value: boolean) => void;
}

export function AppSidebar({
  isSidebarOpen,
  setIsSidebarOpen,
}: AppSidebarProps) {
  return (
    <div
      className={`flex-shrink-0 h-full  bg-gray border-r ${
        isSidebarOpen ? 'w-[260px]' : 'w-0 overflow-hidden'
      }`}
    >
      <div className="flex flex-col h-full px-3">
        {/* Header */}
        <div className="flex justify-between items-center h-[60px]">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarOpen((prev: boolean) => !prev)}
          >
            <AppWindow />
          </Button>
          <HomeButton></HomeButton>
        </div>

        {/* Chat Sessions */}
        <div className="mb-auto">
          <div className="font-semibold px-2 text-sm">Today</div>
          <ChatSessions></ChatSessions>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center h-[60px]">
          <ProfileMenu></ProfileMenu>
        </div>
      </div>
    </div>
  );
}
