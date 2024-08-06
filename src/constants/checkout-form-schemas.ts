import { z } from 'zod';

export const checkoutFormSchema = z.object({
  comment: z.string().optional(),
  email: z.string().email({ message: 'Введите корректную почту' }),
  address: z.string().min(5, { message: 'Введите корректный адрес' }),
  phone: z.string().min(10, { message: 'Введите корректный номер телефона' }),
  firstName: z.string().min(2, { message: 'Имя должно содержать не менее 2-х символов' }),
  lastName: z.string().min(2, { message: 'Фамилия должна содержать не менее 2-х символов' }),
});

export type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;
