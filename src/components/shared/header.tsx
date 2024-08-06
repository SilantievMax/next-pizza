import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib';
import { User } from 'lucide-react';
import { Button } from '@/components/ui';
import { CartButton, Container, SearchInput } from '@/components/shared';

interface Props {
  className?: string;
}

export const Header: FC<Props> = ({ className }) => {
  return (
    <header className={cn('border-b', className)}>
      <Container className='flex items-center justify-between py-8'>
        <>
          <Link href='/'>
            <div className='flex items-center gap-4'>
              <Image src='/logo.png' alt='logo' width={35} height={35} />

              <div>
                <h1 className='text-2xl uppercase font-black'>Next Pizza</h1>
                <p className='text-sm text-gray-400 leading-3'>вкусней уже нет</p>
              </div>
            </div>
          </Link>

          <div className='mx-10 flex-1'>
            <SearchInput />
          </div>

          <div className='flex items-center gap-3'>
            <Button variant='outline' className='flex items-center gap-1'>
              <User size={16} />
              Войти
            </Button>

            <div>
              <CartButton />
            </div>
          </div>
        </>
      </Container>
    </header>
  );
};
