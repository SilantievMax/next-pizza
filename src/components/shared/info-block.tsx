import { FC } from 'react';
import { cn } from '@/lib';
import Link from 'next/link';
import { Button } from '@/components/ui';
import { ArrowLeft } from 'lucide-react';
import { Title } from '@/components/shared';

interface Props {
  title: string;
  text: string;
  imageUrl?: string;
  className?: string;
}

export const InfoBlock: FC<Props> = ({ className, title, text, imageUrl }) => {
  return (
    <div className={cn(className, 'flex w-[840px] items-center justify-between gap-12')}>
      <div className='flex flex-col'>
        <div className='w-[445px]'>
          <Title size='lg' text={title} className='font-extrabold' />

          <p className='text-lg text-gray-400'>{text}</p>
        </div>

        <div className='mt-11 flex gap-5'>
          <Link href='/'>
            <Button variant='outline' className='gap-2'>
              <ArrowLeft />
              На главную
            </Button>
          </Link>

          <a href=''>
            <Button variant='outline' className='border-gray-400 text-gray-500 hover:bg-gray-50'>
              Обновить
            </Button>
          </a>
        </div>
      </div>

      <img src={imageUrl} alt={title} width={300} />
    </div>
  );
};
