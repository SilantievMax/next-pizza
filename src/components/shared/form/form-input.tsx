import { Input } from '@/components/ui';
import { FC, InputHTMLAttributes } from 'react';
import { useFormContext } from 'react-hook-form';
import { ClearButton, ErrorText, RequiredSymbol } from '@/components/shared';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  required?: boolean;
  className?: string;
}

export const FormInput: FC<Props> = ({ name, className, label, required, ...props }) => {
  const {
    watch,
    register,
    setValue,
    formState: { errors },
  } = useFormContext();

  const value = watch(name);
  const error = errors[name];

  const onClickClear = () => {
    setValue(name, '', { shouldValidate: true });
  };

  return (
    <div className={className}>
      {label && (
        <p className='mb-2 font-medium'>
          {label} {required && <RequiredSymbol />}
        </p>
      )}

      <div className='relative'>
        <Input className='text-md h-12' {...register(name)} {...props} />

        {value && <ClearButton onClick={onClickClear} />}
      </div>

      {error && <ErrorText text={error.message as string} className='mt-2' />}
    </div>
  );
};
