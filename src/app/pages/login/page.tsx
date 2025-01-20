'use client';
import Button from '@/components/Button';

export default function Login() {
  function handleClickLogin(): void {
    alert('Button clicked!');
  }

  return (
    <div className="inset-0 h-screen flex justify-center items-center">
      <div className="shadow-sm">
        <input name="username" placeholder="Nhập tên đăng nhập"></input>
        <Button
          value="Đăng ký"
          className="bg-blue-500 text-white"
          onClick={handleClickLogin}
        />
      </div>
    </div>
  );
}
