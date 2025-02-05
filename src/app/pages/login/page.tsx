'use client';
import Button from '@/components/Button';
import {
  checkIfUserExistsByUsername,
  createUser,
} from '@/services/user.service';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Timestamp } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { redirect, useRouter } from 'next/navigation';
import { useAuthStore } from '@/hooks/authStore';

type Inputs = {
  username: string;
};

export default function Login() {
  const { user, login, logout } = useAuthStore();

  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const userExists = await checkIfUserExistsByUsername(data.username);
      if (userExists) {
        setError('username', {
          type: 'manual',
          message: '*Tên đăng nhập đã tồn tại',
        });
        return;
      }
      const user = {
        username: data.username,
        createdAt: Timestamp.fromDate(new Date()),
        lastActive: Timestamp.fromDate(new Date()),
      };

      toast('🦄 Tạo tài khoản thành công! Đang chuyển hướng...', {
        autoClose: 2000,
      });

      await createUser(user);
      login(user.username);
      await new Promise((resolve) => setTimeout(resolve, 2000));

      router.push('/pages/chat');
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };
  return (
    <>
      <div className="inset-0 h-screen flex justify-center items-center flex-col">
        <div className="flex flex-col justify-center items-center mb-auto h-full w-[300px]">
          <form onSubmit={handleSubmit(onSubmit)} className="mb-2 w-full">
            <input
              placeholder="Nhập tên đăng nhập"
              className="border rounded-xl py-2 px-4 outline-none w-full"
              {...register('username', {
                required: '*Tên đăng nhập không được để trống', // Bắt buộc nhập
                pattern: {
                  value: /^(?!.*[_.]{2})[a-zA-Z0-9._]{3,20}(?<![_.])$/, // Regex kiểm tra
                  message: '*Tên đăng nhập phải từ 3-20 ký tự.',
                },
              })}
            ></input>
            {errors.username && (
              <span className="block text-rose-500 text-xs">
                {errors.username.message}
              </span>
            )}
            <Button
              value="Đăng ký"
              className="bg-blue-500 text-white  w-full mt-2"
              type="submit"
            />
          </form>
        </div>
        <div className="text-gray-400 my-4">hoanglamnguyentb@gmail.com</div>
      </div>
    </>
  );
}
