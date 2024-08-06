'use client';

import { cn } from '@/lib';
import { useCart } from '@/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { checkoutFormSchema, CheckoutFormValues } from '@/constants/checkout-form-schemas';
import { CheckoutSidebar, Container, Title, CheckoutCart, CheckoutPersonalForm, CheckoutAddressForm } from '@/components/shared';

export default function CheckoutPage() {
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

  const onSubmit: SubmitHandler<CheckoutFormValues> = (data) => {
    console.log(data);
  };

  const onClickCountButton = (id: number, quantity: number, type: 'plus' | 'minus') => {
    const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
    updateItemQuantity(id, newQuantity);
  };

  return (
    <Container className='mt-10'>
      <Title text='Оформление заказа' size='xl' className='font-extrabold mb-8' />

      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='flex gap-10'>
            <div className='flex flex-col gap-10 flex-1 mb-20'>
              <CheckoutCart items={items} removeCartItem={removeCartItem} onClickCountButton={onClickCountButton} loading={isLoading} />

              <CheckoutPersonalForm className={cn({ 'opacity-40 pointer-events-none': isLoading })} />

              <CheckoutAddressForm className={cn({ 'opacity-40 pointer-events-none': isLoading })} />
            </div>

            <div className='w-[450px]'>
              <CheckoutSidebar totalAmount={totalAmount} loading={isLoading} />
            </div>
          </div>
        </form>
      </FormProvider>
    </Container>
  );
}
