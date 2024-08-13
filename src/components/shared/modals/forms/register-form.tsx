import { FC } from 'react';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui';
import { registerUser } from '@/app/actions';
import { FormInput } from '@/components/shared';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { formRegisterSchema, TFormRegisterValues } from './schemas';

interface Props {
  onClose?: VoidFunction;
}

export const RegisterForm: FC<Props> = ({ onClose }) => {
  const form = useForm<TFormRegisterValues>({
    resolver: zodResolver(formRegisterSchema),
    defaultValues: {
      email: '',
      password: '',
      fullName: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: TFormRegisterValues) => {
    try {
      await registerUser({
        email: data.email,
        fullName: data.fullName,
        password: data.password,
      });

      toast.success('Регистрация успешна 📝. Подтвердите свою почту', {
        icon: '✅',
      });

      onClose?.();
    } catch (err) {
      console.log('[LOGIN FORM]', err);
      toast.error('Неверный E-Mail или пароль', {
        icon: '❌',
      });
    }
  };

  return (
    <FormProvider {...form}>
      <form className='flex flex-col gap-5' onSubmit={form.handleSubmit(onSubmit)}>
        <FormInput name='email' label='E-Mail' required />

        <FormInput name='fullName' label='Полное имя' required />

        <FormInput name='password' label='Пароль' type='password' required />

        <FormInput name='confirmPassword' label='Подтвердите пароль' type='password' required />

        <Button disabled={form.formState.isSubmitting} className='h-12 text-base' type='submit'>
          Зарегистрироваться
        </Button>
      </form>
    </FormProvider>
  );
};
