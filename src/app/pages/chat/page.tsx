import Button from '@/components/Button';

export default function Chat() {
  return (
    <>
      <div className="h-screen flex flex-col">
        <div className="bg-gray-200 flex-1 overflow-y-scroll">
          <div className="px-4 py-2">
            <div className="flex items-center mb-2">
              <img
                className="w-8 h-8 rounded-full mr-2"
                src="https://picsum.photos/50/50"
                alt="User Avatar"
              />
              <div className="font-medium">John Doe</div>
            </div>
            <div className="bg-white rounded-lg p-2 shadow mb-2 max-w-sm">
              Hi, how can I help you?
            </div>
            <div className="flex items-center justify-end">
              <div className="bg-primary text-white rounded-lg p-2 shadow mr-2 max-w-sm">
                Sure, I can help with that.
              </div>
              <img
                className="w-8 h-8 rounded-full"
                src="https://picsum.photos/50/50"
                alt="User Avatar"
              />
            </div>
          </div>
        </div>
        <div className="bg-gray-100 px-4 py-2">
          <div className="flex items-center">
            <Button
              value="Huỷ bỏ"
              className="mr-2 flex-shrink-0 !rounded-full bg-red"
            ></Button>
            <input
              className="w-full border rounded-lg rounded-r-none py-2 px-4 outline-none"
              type="text"
              placeholder="Type your message..."
            />
            <Button value="Send" className="rounded-l-none"></Button>
          </div>
        </div>
      </div>
    </>
  );
}
