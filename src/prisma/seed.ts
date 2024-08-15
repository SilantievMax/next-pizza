import { Prisma, PrismaClient } from '@prisma/client';
import { cartItems, carts, categories, _ingredients, pizza1, pizza2, pizza3, products, users, story, storyItem } from './constants';

const prisma = new PrismaClient();

const randomDecimalNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) * 10 + min * 10) / 10;
};

const generateProductItem = ({ productId, pizzaType, size }: { productId: number; pizzaType?: number; size?: number }) => {
  return {
    productId,
    price: randomDecimalNumber(190, 600),
    pizzaType,
    size,
  } as Prisma.ProductItemUncheckedCreateInput;
};

async function up() {
  await prisma.user.createMany({
    data: users as Prisma.UserCreateManyInput[],
  });

  await prisma.category.createMany({
    data: categories,
  });

  await prisma.product.createMany({
    data: products,
  });

  await prisma.ingredient.createMany({
    data: _ingredients,
  });

  const product1 = await prisma.product.create({
    data: pizza1,
  });

  const product2 = await prisma.product.create({
    data: pizza2,
  });

  const product3 = await prisma.product.create({
    data: pizza3,
  });

  await prisma.productItem.createMany({
    data: [
      // Пицца "Пепперони фреш"
      generateProductItem({ productId: product1.id, pizzaType: 1, size: 20 }),
      generateProductItem({ productId: product1.id, pizzaType: 2, size: 30 }),
      generateProductItem({ productId: product1.id, pizzaType: 2, size: 40 }),

      // Пицца "Сырная"
      generateProductItem({ productId: product2.id, pizzaType: 1, size: 20 }),
      generateProductItem({ productId: product2.id, pizzaType: 1, size: 30 }),
      generateProductItem({ productId: product2.id, pizzaType: 1, size: 40 }),
      generateProductItem({ productId: product2.id, pizzaType: 2, size: 20 }),
      generateProductItem({ productId: product2.id, pizzaType: 2, size: 30 }),
      generateProductItem({ productId: product2.id, pizzaType: 2, size: 40 }),

      // Пицца "Чоризо фреш"
      generateProductItem({ productId: product3.id, pizzaType: 1, size: 20 }),
      generateProductItem({ productId: product3.id, pizzaType: 2, size: 30 }),
      generateProductItem({ productId: product3.id, pizzaType: 2, size: 40 }),

      // Остальные продукты
      generateProductItem({ productId: 1 }),
      generateProductItem({ productId: 2 }),
      generateProductItem({ productId: 3 }),
      generateProductItem({ productId: 4 }),
      generateProductItem({ productId: 5 }),
      generateProductItem({ productId: 6 }),
      generateProductItem({ productId: 7 }),
      generateProductItem({ productId: 8 }),
      generateProductItem({ productId: 9 }),
      generateProductItem({ productId: 10 }),
      generateProductItem({ productId: 11 }),
      generateProductItem({ productId: 12 }),
      generateProductItem({ productId: 13 }),
      generateProductItem({ productId: 14 }),
      generateProductItem({ productId: 15 }),
      generateProductItem({ productId: 16 }),
      generateProductItem({ productId: 17 }),
    ],
  });

  await prisma.cart.createMany({
    data: carts,
  });

  await prisma.cartItem.create({
    data: cartItems,
  });

  await prisma.story.createMany({
    data: story,
  });

  await prisma.storyItem.createMany({
    data: storyItem,
  });
}

async function down() {
  // const tables = ['User', 'Product', 'Ingredient', 'Order', 'ProductItem', 'VerificationCode', 'Category', 'Cart', 'CartItem', 'Story', 'StoryItem'];
  await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "ProductItem" RESTART IDENTITY CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "Ingredient" RESTART IDENTITY CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "Order" RESTART IDENTITY CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "VerificationCode" RESTART IDENTITY CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "CartItem" RESTART IDENTITY CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "Story" RESTART IDENTITY CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "StoryItem" RESTART IDENTITY CASCADE;`;
}

async function main() {
  try {
    await down();
    await up();
  } catch (e) {
    console.error(e);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
