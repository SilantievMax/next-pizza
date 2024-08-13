'use client';

import { Toaster } from 'react-hot-toast';
import NextTopLoader from 'nextjs-toploader';
import { FC, PropsWithChildren } from 'react';
import { SessionProvider } from 'next-auth/react';

export const Providers: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Toaster />

      <NextTopLoader />

      <SessionProvider>{children}</SessionProvider>
    </>
  );
};
