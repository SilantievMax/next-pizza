import { Ingredient, Product, ProductItem } from '@prisma/client';

export type PoductWithRelationsType = Product & { items: ProductItem[]; ingredients: Ingredient[] };
