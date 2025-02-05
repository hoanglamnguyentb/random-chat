'use client';
import Button from '@/components/Button';
import { useChatSessionStore } from '@/hooks/chatSessionStore';

export default function Chat() {
  const { chatSession, setChatSession, clearChatSession } =
    useChatSessionStore();
  return (
    <>
      <div className="h-screen">
        <div className="w-8/12 h-full  flex flex-col items-center m-auto">
          <div className="text-center p-3 font-boldf flex gap-2 items-center">
            Cuộc hội thoại{' '}
            <span className="underline">
              {chatSession ? chatSession.id : 'Chưa có cuộc hội thoại'}
            </span>
            <span className="hover:bg-gray-200 bg-gray-100 rounded-full p-1 cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6 opacity-50"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
            </span>
          </div>
          <div className="w-full flex-1 overflow-y-auto">
            <div className="px-4 py-2">
              <div className="flex">
                <div className="flex items-center mb-2">
                  <img
                    className="w-8 h-8 rounded-full mr-2"
                    src="https://picsum.photos/50/50"
                    alt="User Avatar"
                  />
                  {/* <div className="font-medium">John Doe</div> */}
                </div>
                <div className="">Hi, how can I help you?</div>
              </div>
              <div className="flex items-center justify-end">
                <div className="bg-sky-100 rounded-xl p-2 mr-2 max-w-sm">
                  Sure, I can help with that.
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-100 p-2 w-full rounded-xl p-2 mb-3">
            <div className="flex items-center">
              <input
                className="w-full rounded-lg rounded-r-none p-2 outline-none bg-transparent"
                type="text"
                placeholder="Tin nhắn của bạn..."
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-9 rounded-full bg-black text-white p-2 cursor-pointer"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m9 9 6-6m0 0 6 6m-6-6v12a6 6 0 0 1-12 0v-3"
                />
              </svg>

              {/* <Button value="Send" className="rounded-l-none"></Button> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
