import { FC } from 'react';
import { cn } from '@/lib';

interface Props {
  text: string;
  className?: string;
}

export const ErrorText: FC<Props> = ({ text, className }) => {
  return <p className={cn('text-sm text-red-500', className)}>{text}</p>;
};
