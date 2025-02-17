import React from 'react';
import { Loader2, Send } from 'lucide-react';

import { Button } from './ui/button';

const StartChat = () => {
  return (
    <div className="text-center w-full bg-white absolute -translate-x-1/2 -translate-y-1/2 left-1/2  top-1/2">
      <div className="mb-2 font-bold text-primary text-xl">Chat Q_Q</div>
      <div className="w-6/12 m-auto bg-gray-100 p-5 rounded-3xl mb-3">
        <div className="mb-2 font-bold">Giới tính</div>
        <div className="flex gap-2 justify-center my-2">
          <Button className="rounded-3xl" variant="outline" size="sm">
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
              className="lucide lucide-mars"
            >
              <path d="M16 3h5v5" />
              <path d="m21 3-6.75 6.75" />
              <circle cx={10} cy={14} r={6} />
            </svg>
            Nam
          </Button>
          <Button className="rounded-3xl" variant="outline" size="sm">
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
              className="lucide lucide-venus"
            >
              <path d="M12 15v7" />
              <path d="M9 19h6" />
              <circle cx={12} cy={9} r={6} />
            </svg>
            Nữ
          </Button>
          <Button className="rounded-3xl" variant="outline" size="sm">
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
              className="lucide lucide-venus-and-mars"
            >
              <path d="M10 20h4" />
              <path d="M12 16v6" />
              <path d="M17 2h4v4" />
              <path d="m21 2-5.46 5.46" />
              <circle cx={12} cy={11} r={5} />
            </svg>
            Không xác định
          </Button>
        </div>
        <Button variant="default" className="rounded-xl mt-3">
          <Loader2 className="animate-spin" />
          Tìm kiếm
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
