import React, { useEffect, useState } from 'react';
import { Loader2, Send } from 'lucide-react';

import { Button } from './ui/button';
import { useAuthStore } from '@/stores/authStore';
import { findMatch } from '@/services/waitingUser.service';
import { useChatSessionStore } from '@/stores/chatSessionStore';

const genderOptions = [
  { id: 'male', label: 'Nam', icon: 'mars' },
  { id: 'female', label: 'Nữ', icon: 'venus' },
  { id: 'other', label: 'Không xác định', icon: 'venus-and-mars' },
];

const StartChat = () => {
  const { user } = useAuthStore();
  const { setChatSession, addChatSession } = useChatSessionStore();

  const [searchModel, setSearchModel] = useState(() => {
    return JSON.parse(localStorage.getItem('searchModel') || '[]') || [];
  });

  const [roomId, setRoomId] = useState<string | null>(null);

  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (!user?.id) return;
    localStorage.setItem('searchModel', JSON.stringify(searchModel));
  }, [searchModel]);

  const handleSelect = (id: string) => {
    setSearchModel((prev: string[]) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleFindMatch = async () => {
    if (!user?.id) return;
    setIsSearching(true);

    let matchedRoom = null;
    const startTime = Date.now();

    while (!matchedRoom && Date.now() - startTime < 10000) {
      // Lặp trong 10s
      matchedRoom = await findMatch(user.id);
      if (matchedRoom) break;

      await new Promise((resolve) => setTimeout(resolve, 2000)); // Đợi 2s rồi thử lại
    }

    if (matchedRoom) {
      alert(`Đã tìm thấy phòng: ${matchedRoom}`);
    } else {
      alert('Không tìm thấy ai, vui lòng thử lại!');
    }

    setIsSearching(false);
  };

  return (
    <div className="text-center w-full bg-white absolute -translate-x-1/2 -translate-y-1/2 left-1/2  top-1/2">
      <div className="mb-2 font-bold text-primary text-xl">Chat Q_Q</div>
      <div className="w-6/12 m-auto bg-gray-100 p-5 rounded-3xl mb-3">
        <div className="mb-2 font-bold">Giới tính</div>
        <div className="flex gap-2 justify-center my-2">
          {genderOptions.map(({ id, label, icon }) => (
            <Button
              key={id}
              className={`rounded-3xl ${
                searchModel.includes(id) ? 'border-primary' : ''
              }`}
              variant="outline"
              size="sm"
              onClick={() => handleSelect(id)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`lucide lucide-${icon}`}
              >
                {icon === 'mars' && (
                  <>
                    <path d="M16 3h5v5" />
                    <path d="m21 3-6.75 6.75" />
                    <circle cx={10} cy={14} r={6} />
                  </>
                )}
                {icon === 'venus' && (
                  <>
                    <path d="M12 15v7" />
                    <path d="M9 19h6" />
                    <circle cx={12} cy={9} r={6} />
                  </>
                )}
                {icon === 'venus-and-mars' && (
                  <>
                    <path d="M10 20h4" />
                    <path d="M12 16v6" />
                    <path d="M17 2h4v4" />
                    <path d="m21 2-5.46 5.46" />
                    <circle cx={12} cy={11} r={5} />
                  </>
                )}
              </svg>
              {label}
            </Button>
          ))}
        </div>
        <Button
          variant="default"
          className="rounded-xl mt-3"
          onClick={handleFindMatch}
        >
          {isSearching ? <Loader2 className="animate-spin" /> : 'Tìm kiếm'}
        </Button>
      </div>
      <div className="text-sm">
        Hãy tôn trọng và tuân theo các{' '}
        <a href="#" className="hover:underline text-primary">
          quy tắc
        </a>{' '}
        trò chuyện của chúng tôi
      </div>
    </div>
  );
};

export default StartChat;
