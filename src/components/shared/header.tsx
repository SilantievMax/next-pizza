'use client';

import { cn } from '@/lib';
import Link from 'next/link';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { FC, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { AuthModal, CartButton, Container, ProfileButton, SearchInput } from '@/components/shared';

interface Props {
  hasCart?: boolean;
  className?: string;
  hasSearch?: boolean;
}

export const Header: FC<Props> = ({ className, hasSearch = true, hasCart = true }) => {
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    let toastMessage = '';

    if (searchParams.has('paid')) {
      toastMessage = 'Заказ успешно оплачен! Информация отправлена на почту.';
    }

    if (searchParams.has('verified')) {
      toastMessage = 'Почта успешно подтверждина!';
    }

    if (toastMessage) {
      setTimeout(() => {
        toast.success(toastMessage);
      }, 500);
    }
  }, []);

  return (
    <header className={cn('border-b', className)}>
      <Container className='flex items-center justify-between py-8'>
        <>
          <Link href='/'>
            <div className='flex items-center gap-4'>
              <Image src='/logo.png' alt='logo' width={35} height={35} />

              <div>
                <h1 className='text-2xl font-black uppercase'>Next Pizza</h1>
                <p className='text-sm leading-3 text-gray-400'>вкусней уже нет</p>
              </div>
            </div>
          </Link>

          {hasSearch && (
            <div className='mx-10 flex-1'>
              <SearchInput />
            </div>
          )}

          <div className='flex items-center gap-3'>
            <AuthModal isOpen={openAuthModal} onClose={() => setOpenAuthModal(false)} />

            <ProfileButton onClickSignIn={() => setOpenAuthModal(true)} />

            {hasCart && (
              <div>
                <CartButton />
              </div>
            )}
          </div>
        </>
      </Container>
    </header>
  );
};
