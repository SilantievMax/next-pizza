import { FC } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui';
import { useSession } from 'next-auth/react';
import { CircleUser, User } from 'lucide-react';

interface Props {
  onClickSignIn: VoidFunction;
  className?: string;
}

export const ProfileButton: FC<Props> = ({ className, onClickSignIn }) => {
  const { data: session } = useSession();

  return (
    <div className={className}>
      {!session ? (
        <Button variant='outline' className='flex items-center gap-1' onClick={onClickSignIn}>
          <User size={16} />
          Войти
        </Button>
      ) : (
        <Link href='/profile'>
          <Button variant='secondary' className='flex items-center gap-1'>
            <CircleUser size={18} />
            Профиль
          </Button>
        </Link>
      )}
    </div>
  );
};
