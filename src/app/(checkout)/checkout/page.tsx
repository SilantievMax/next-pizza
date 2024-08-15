'use client';

import { cn } from '@/lib';
import { useCart } from '@/hooks';
import toast from 'react-hot-toast';
import { redirect } from 'next/navigation';
import { createOrder } from '@/app/actions';
import { Api } from '@/services/api-client';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { checkoutFormSchema, CheckoutFormValues } from '@/constants/checkout-form-schemas';
import { CheckoutSidebar, Container, Title, CheckoutCart, CheckoutPersonalForm, CheckoutAddressForm } from '@/components/shared';

export default function CheckoutPage() {
  const { data: session } = useSession();
  const [submitting, setSubmitting] = useState(false);
  const { items, removeCartItem, totalAmount, updateItemQuantity, loading } = useCart();

  const isLoading = loading && items.length === 0;

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      email: '',
      phone: '',
      address: '',
      comment: '',
      lastName: '',
      firstName: '',
    },
  });

  const onSubmit: SubmitHandler<CheckoutFormValues> = async (data) => {
    try {
      setSubmitting(true);
      const url = await createOrder(data);

      toast.error('Заказ успешно оформлен! 📝 Переход на оплату', {
        icon: '✅',
      });

      if (url) {
        location.href = url;
      }
    } catch (err) {
      console.log(err);
      setSubmitting(false);
      toast.error('Не удалось создать заказ', {
        icon: '❌',
      });
    }
  };

  const onClickCountButton = (id: number, quantity: number, type: 'plus' | 'minus') => {
    const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
    updateItemQuantity(id, newQuantity);
  };

  if (items.length === 0) {
    redirect('/');
  }

  useEffect(() => {
    async function fetchUserInfo() {
      const data = await Api.auth.getMe();
      const [firstName, lastName] = data.fullName.split(' ');

      form.setValue('firstName', firstName);
      form.setValue('lastName', lastName);
      form.setValue('email', data.email);
    }

    if (session) {
      fetchUserInfo();
    }
  }, [session]);

  return (
    <Container className='mt-10'>
      <Title text='Оформление заказа' size='xl' className='mb-8 font-extrabold' />

      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='flex gap-10'>
            <div className='mb-20 flex flex-1 flex-col gap-10'>
              <CheckoutCart items={items} removeCartItem={removeCartItem} onClickCountButton={onClickCountButton} loading={isLoading} />

              <CheckoutPersonalForm className={cn({ 'pointer-events-none opacity-40': isLoading })} />

              <CheckoutAddressForm className={cn({ 'pointer-events-none opacity-40': isLoading })} />
            </div>

            <div className='w-[450px]'>
              <CheckoutSidebar totalAmount={totalAmount} loading={isLoading || submitting} />
            </div>
          </div>
        </form>
      </FormProvider>
    </Container>
  );
}
