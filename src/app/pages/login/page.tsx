'use client';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Timestamp } from 'firebase/firestore';
import { toast } from 'react-toastify';
import {
  checkIfUserExistsByUsername,
  createUser,
  loginUser,
} from '@/services/user.service';
import { useAuthStore } from '@/stores/authStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';

type Inputs = {
  username: string;
  password: string;
};

export default function Login() {
  const { login } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
  } = useForm<Inputs>();

  const handleLoginUser = async (username: string, password: string) => {
    try {
      setIsLoading(true);
      const userId = await loginUser(username, password);
      login({ id: userId, username, password });
      router.push('/pages/chat');
      setIsLoading(false);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Đã có lỗi xảy ra!';
      setError('username', {
        type: 'manual',
        message: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      await handleLoginUser(data.username, data.password);
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-center w-[300px] flex-grow h-full">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <Input
            type="text"
            className="mb-2"
            placeholder="Nhập tên đăng nhập"
            {...register('username', {
              required: '*Tên đăng nhập không được để trống',
              pattern: {
                value: /^(?!.*[_.]{2})[a-zA-Z0-9._]{3,20}(?<![_.])$/,
                message: '*Tên đăng nhập phải từ 3-20 ký tự.',
              },
            })}
          />
          {errors.username && (
            <span className="block text-rose-500 text-xs">
              {errors.username.message}
            </span>
          )}

          <Input
            type="text"
            placeholder="Nhập mật khẩu"
            className="mb-2"
            {...register('password', {
              required: '*Mật khẩu không được để trống.',
              minLength: { value: 8, message: '* Mật khẩu tối thiểu 8 ký tự.' },
            })}
          />
          {errors.password && (
            <span className="block text-rose-500 text-xs">
              {errors.password.message}
            </span>
          )}

          <Button className=" w-full mt-2" type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="animate-spin" />}
            Đăng nhập
          </Button>
        </form>
      </div>
      <div className="text-gray-400 my-4">hoanglamnguyentb@gmail.com</div>
    </div>
  );
}
