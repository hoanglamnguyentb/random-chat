'use client';
import Button from '@/components/Button';
import {
  checkIfUserExistsByUsername,
  createUser,
} from '@/services/user.service';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Timestamp } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { redirect } from 'next/navigation';

type Inputs = {
  username: string;
};

export default function Login() {
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
      await createUser(user);
      redirect('/pages/chat');
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };
  return (
    <>
      <div className="inset-0 h-screen flex justify-center items-center flex-col">
        <form onSubmit={handleSubmit(onSubmit)} className="mb-2">
          <input
            placeholder="Nhập tên đăng nhập"
            className="border rounded-lg rounded-r-none py-2 px-4 outline-none"
            {...register('username', {
              required: '*Tên đăng nhập không được để trống', // Bắt buộc nhập
              pattern: {
                value: /^(?!.*[_.]{2})[a-zA-Z0-9._]{3,20}(?<![_.])$/, // Regex kiểm tra
                message: '*Tên đăng nhập phải từ 3-20 ký tự',
              },
            })}
          ></input>
          <Button
            value="Join now!!!"
            className="bg-blue-500 text-white rounded-l-none"
            type="submit"
          />
        </form>
        {errors.username && (
          <span className="block text-rose-400 text-sm">
            {errors.username.message}
          </span>
        )}
      </div>
    </>
  );
}
