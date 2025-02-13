'use client';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Timestamp } from 'firebase/firestore';
import { toast } from 'react-toastify';
import {
  checkIfUserExistsByUsername,
  createUser,
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
  term: boolean;
};

export default function SingUp() {
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

  const handleCreateUser = async (username: string, password: string) => {
    const userExists = await checkIfUserExistsByUsername(username);
    if (userExists) {
      setError('username', {
        type: 'manual',
        message: '*Tên đăng nhập đã tồn tại',
      });
      return;
    }

    const now = Timestamp.fromDate(new Date());
    const user = { username, password, createdAt: now, lastActive: now };

    await toast.promise(
      (async () => {
        setIsLoading(true);
        const userId = await createUser(user);
        login({ id: userId, ...user });
        await new Promise((resolve) => setTimeout(resolve, 2000));
        router.push('/pages/chat');
        setIsLoading(false);
      })(),
      {
        pending: 'Đang tạo tài khoản...',
        // success: '🦄 Tạo tài khoản thành công! Đang chuyển hướng...',
        error: 'Có lỗi xảy ra!',
      }
    );
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      await handleCreateUser(data.username, data.password);
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
            placeholder="Nhập tên đăng nhập"
            className="mb-2"
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
          <div className="flex items-center space-x-2 mt-2">
            <Checkbox
              id="terms"
              {...register('term', { required: true })}
              onCheckedChange={(checked) =>
                setValue('term', checked as boolean)
              }
            />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Đồng ý với điều khoản và điều kiện
            </label>
          </div>
          {errors.term && (
            <span className="block text-rose-500 text-xs">
              *Bạn phải đồng ý với điều khoản và điều kiện.
            </span>
          )}
          <Button className=" w-full mt-2" type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="animate-spin" />}
            Đăng ký
          </Button>
        </form>
      </div>
      <div className="text-gray-400 my-4">hoanglamnguyentb@gmail.com</div>
    </div>
  );
}
