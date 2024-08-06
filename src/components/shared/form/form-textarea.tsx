import { Textarea } from '@/components/ui';
import { useFormContext } from 'react-hook-form';
import { FC, TextareaHTMLAttributes } from 'react';
import { ClearButton, ErrorText, RequiredSymbol } from '@/components/shared';

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label?: string;
  required?: boolean;
  className?: string;
}

export const FormTextarea: FC<Props> = ({ className, name, label, required, ...props }) => {
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
        <p className='font-medium mb-2'>
          {label} {required && <RequiredSymbol />}
        </p>
      )}

      <div className='relative'>
        <Textarea className='h-12 text-md' {...register(name)} {...props} />

        {value && <ClearButton onClick={onClickClear} />}
      </div>

      {error && <ErrorText text={error.message as string} className='mt-2' />}
    </div>
  );
};
