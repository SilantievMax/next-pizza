'use client';

import { FC, useState } from 'react';
import { signIn } from 'next-auth/react';
import { Button, Dialog, DialogContent } from '@/components/ui';
import { LoginForm, RegisterForm, GithubIcon, GoogleIcon } from '@/components/shared';

interface Props {
  isOpen: boolean;
  onClose: VoidFunction;
}

export const AuthModal: FC<Props> = ({ isOpen, onClose }) => {
  const [type, setType] = useState<'login' | 'register'>('login');

  const handleSwitchType = () => {
    setType(type === 'login' ? 'register' : 'login');
  };

  const handleClose = () => {
    onClose();
  };

  const handleSignInGitHub = () => {
    signIn('github', { callbackUrl: '/', redirect: true });
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className='w-[450px] bg-white p-10'>
        {type === 'login' && <LoginForm onClose={handleClose} />}

        {type === 'register' && <RegisterForm onClose={handleClose} />}

        <hr />

        <div className='flex gap-2'>
          <Button variant='secondary' onClick={handleSignInGitHub} type='button' className='h-12 flex-1 gap-2 p-2'>
            <GithubIcon className='h-6 w-6' />
            GitHub
          </Button>

          <Button
            variant='secondary'
            onClick={() =>
              signIn('google', {
                callbackUrl: '/',
                redirect: true,
              })
            }
            type='button'
            className='pointer-events-none h-12 flex-1 cursor-not-allowed gap-2 p-2'
          >
            <GoogleIcon className='h-6 w-6' />
            Google
          </Button>
        </div>

        <Button className='h-12' variant='outline' onClick={handleSwitchType} type='button'>
          {type === 'register' ? 'Войти' : 'Регистрация'}
        </Button>
      </DialogContent>
    </Dialog>
  );
};
