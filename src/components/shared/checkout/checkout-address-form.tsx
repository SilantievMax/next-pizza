import { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { AdressInput, ErrorText, FormTextarea, WhiteBlock } from '@/components/shared';

interface Props {
  className?: string;
}

export const CheckoutAddressForm: FC<Props> = ({ className }) => {
  const { control } = useFormContext();

  return (
    <WhiteBlock title='3. Адрес доставки' className={className}>
      <div className='flex flex-col gap-5'>
        <Controller
          control={control}
          name='address'
          render={({ field, fieldState }) => (
            <>
              {/* todo */}
              {/* <Input name='firstName' className='text-base' placeholder='Адрес доставки' /> */}
              <AdressInput onChange={field.onChange} />

              {fieldState.error && <ErrorText text={fieldState.error.message as string} />}
            </>
          )}
        />

        <FormTextarea name='comment' className='text-base' rows={5} placeholder='Комментарий к заказу' />
      </div>
    </WhiteBlock>
  );
};
