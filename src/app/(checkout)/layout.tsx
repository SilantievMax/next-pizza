import { ReactNode } from 'react';
import type { Metadata } from 'next';
import { Container, Header } from '@/components/shared';

export const metadata: Metadata = {
  title: 'Next Pizza | Корзина',
  description: 'Generated by create next app',
};

export default async function CheckoutLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <main className='min-h-screen bg-[#F4F1EE]'>
      <Container>
        <Header className='border-gray-200' hasCart={false} hasSearch={false} />

        {children}
      </Container>
    </main>
  );
}
