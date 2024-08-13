// Ref: https://next-auth.js.org/getting-started/typescript#module-augmentation

import type { UserRole } from '@prisma/client';
import { JWT, DefaultJWT } from 'next-auth/jwt';
import { DefaultSession, DefaultUser } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name: string;
      image: string;
      role: UserRole;
    };
  }

  interface User extends DefaultUser {
    id: number;
    role: UserRole;
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    id: string;
    role: UserRole;
  }
}
