'use client';

import { FC } from 'react';
import { cn } from '@/lib';
import { useRouter } from 'next/navigation';
import { ProductForm } from '@/components/shared';
import { PoductWithRelationsType } from '@/types/prisma';
import { Dialog, DialogContent } from '@/components/ui/dialog';

interface Props {
  product: PoductWithRelationsType;
  className?: string;
}

export const ChooseProductModal: FC<Props> = ({ className, product }) => {
  const router = useRouter();

  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogContent className={cn('min-h-[500px] w-[1060px] max-w-[1060px] overflow-hidden bg-white p-0', className)}>
        <ProductForm product={product} onSubmit={() => router.back()} />
      </DialogContent>
    </Dialog>
  );
};
