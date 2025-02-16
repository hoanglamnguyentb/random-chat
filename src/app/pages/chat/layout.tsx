export const metadata = {
  title: 'Trang chủ - Website của tôi',
  description:
    'Đây là trang chủ của website tôi, nơi cung cấp thông tin hữu ích.',
};

export default function ChatLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="flex h-screen">{children}</div>
    </>
  );
}
