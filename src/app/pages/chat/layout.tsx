import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Chat ngẫu nhiên',
  description: 'Chat ngẫu nhiên',
};

export default function ChatLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="flex h-screen">
        <div className="flex-shrink-0 h-full w-[260px] bg-gray-50">
          <div className="flex flex-col h-full px-3">
            <div className="flex justify-between items-center h-[60px]">
              <div className="px-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6 cursor-pointer"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 8.25V18a2.25 2.25 0 0 0 2.25 2.25h13.5A2.25 2.25 0 0 0 21 18V8.25m-18 0V6a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 6v2.25m-18 0h18M5.25 6h.008v.008H5.25V6ZM7.5 6h.008v.008H7.5V6Zm2.25 0h.008v.008H9.75V6Z"
                  />
                </svg>
              </div>
            </div>
            <div className="mb-auto">
              <div className="font-semibold px-2 text-sm">Today</div>
              <div className="flex justify-between p-2 hover:bg-gray-200 rounded-lg cursor-pointer">
                <div>Đoạn chat 01</div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                  />
                </svg>
              </div>
            </div>
            <div className="flex justify-between items-center h-[60px]">
              <div className="p-2 flex w-full hover:bg-gray-200 rounded-xl cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
                Thông tin tài khoản
              </div>
            </div>
          </div>
        </div>
        <div className="relative flex h-full max-w-full flex-1 flex-col overflow-hidden">
          {children}
        </div>
      </div>
    </>
  );
}
