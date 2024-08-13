import { InfoBlock } from '@/components/shared';

export default function UnauthorizedPage() {
  return (
    <div className='mt-40 flex flex-col items-center justify-center'>
      <InfoBlock title='Доступ запрещён' text='Данную страницу могут просматривать только авторизованные пользователи' imageUrl='/images/lock.png' />
    </div>
  );
}
