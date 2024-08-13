import { FC } from 'react';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui';
import { signIn } from 'next-auth/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormInput, Title } from '@/components/shared';
import { FormProvider, useForm } from 'react-hook-form';
import { formLoginSchema, TFormLoginValues } from './schemas';

interface Props {
  onClose?: VoidFunction;
}

export const LoginForm: FC<Props> = ({ onClose }) => {
  const form = useForm<TFormLoginValues>({
    resolver: zodResolver(formLoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: TFormLoginValues) => {
    try {
      const resp = await signIn('credentials', {
        ...data,
        redirect: false,
      });

      if (!resp?.ok) {
        throw Error();
      }

      toast.success('Вы успешно вошли в аккаунт', { icon: '✅' });

      onClose?.();
    } catch (err) {
      console.log('[LOGIN FORM]', err);
      toast.error('Не удалось войти в аккаунт', { icon: '❌' });
    }
  };

  return (
    <FormProvider {...form}>
      <form className='flex flex-col gap-5' onSubmit={form.handleSubmit(onSubmit)}>
        <div className='flex items-center justify-between'>
          <div className='mr-2'>
            <Title text='Вход в аккаунт' size='md' className='font-bold' />

            <p className='text-gray-400'>Введите свою почту, чтобы войти в свой аккаунт</p>
          </div>

          <img src='/images/phone-icon.png' alt='phone-icon' width={60} height={60} />
        </div>

        <FormInput name='email' label='E-Mail' required />

        <FormInput type='password' name='password' label='Пароль' required />

        <Button loading={form.formState.isSubmitting} className='h-12 text-base' type='submit'>
          Войти
        </Button>
      </form>
    </FormProvider>
  );
};
