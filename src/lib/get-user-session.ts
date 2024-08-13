import { getServerSession } from 'next-auth';
import { authOptions } from '@/constants/auth-options';

export const getUserSession = async () => {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    return session.user;
  }

  return null;
};
