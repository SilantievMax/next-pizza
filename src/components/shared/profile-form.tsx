'use client';

import { FC } from 'react';
import toast from 'react-hot-toast';
import { User } from '@prisma/client';
import { Button } from '@/components/ui';
import { signOut } from 'next-auth/react';
import { updateUserInfo } from '@/app/actions';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { Container, FormInput, Title } from '@/components/shared';
import { formRegisterSchema, TFormRegisterValues } from './modals/forms/schemas';

interface Props {
  data: User;
}

export const ProfileForm: FC<Props> = ({ data }) => {
  const form = useForm<TFormRegisterValues>({
    resolver: zodResolver(formRegisterSchema),
    defaultValues: {
      password: '',
      email: data.email,
      confirmPassword: '',
      fullName: data.fullName,
    },
  });

  const onSubmit = async (data: TFormRegisterValues) => {
    try {
      await updateUserInfo({
        email: data.email,
        fullName: data.fullName,
        password: data.password,
      });

      toast.error('Данные обновлены 📝', {
        icon: '✅',
      });
    } catch (err) {
      return toast.error('Ошибка при обновлении данных', {
        icon: '❌',
      });
    }
  };

  const onClickSignOut = () => {
    signOut({
      callbackUrl: '/',
    });
  };

  return (
    <Container className='my-10'>
      <Title text='Личные данные' size='md' className='font-bold' />

      <FormProvider {...form}>
        <form className='mt-10 flex w-96 flex-col gap-5' onSubmit={form.handleSubmit(onSubmit)}>
          <FormInput name='email' label='E-Mail' required />

          <FormInput name='fullName' label='Полное имя' required />

          <FormInput type='password' name='password' label='Новый пароль' required />

          <FormInput type='password' name='confirmPassword' label='Повторите пароль' required />

          <Button disabled={form.formState.isSubmitting} className='mt-10 text-base' type='submit'>
            Сохранить
          </Button>

          <Button onClick={onClickSignOut} variant='secondary' disabled={form.formState.isSubmitting} className='text-base' type='button'>
            Выйти
          </Button>
        </form>
      </FormProvider>
    </Container>
  );
};
