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

type Inputs = {
  username: string;
};

export default function Login() {
  const { login } = useAuthStore();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Inputs>();

  const handleCreateUser = async (username: string) => {
    const userExists = await checkIfUserExistsByUsername(username);
    if (userExists) {
      setError('username', {
        type: 'manual',
        message: '*Tên đăng nhập đã tồn tại',
      });
      return;
    }

    const now = Timestamp.fromDate(new Date());
    const user = { username, createdAt: now, lastActive: now };

    await toast.promise(
      (async () => {
        const userId = await createUser(user);
        login({ id: userId, ...user });
        await new Promise((resolve) => setTimeout(resolve, 2000));
        router.push('/pages/chat');
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
      await handleCreateUser(data.username);
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
            {...register('username', {
              required: '*Tên đăng nhập không được để trống',
              pattern: {
                value: /^(?!.*[_.]{2})[a-zA-Z0-9._]{3,20}(?<![_.])$/,
                message: '*Tên đăng nhập phải từ 3-20 ký tự.',
              },
            })}
          />
          {/* <input
            autoFocus
            placeholder="Nhập tên đăng nhập"
            className="border rounded-xl py-2 px-4 outline-none w-full"
          /> */}
          {errors.username && (
            <span className="block text-rose-500 text-xs">
              {errors.username.message}
            </span>
          )}
          <Button className=" w-full mt-2" type="submit">
            Đăng ký
          </Button>
        </form>
      </div>
      <div className="text-gray-400 my-4">hoanglamnguyentb@gmail.com</div>
    </div>
  );
}
