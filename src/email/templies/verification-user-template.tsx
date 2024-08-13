import { Layout } from '@/email/components';
import { Heading, Link, Text } from '@react-email/components';

interface Props {
  code: string;
}

export function VerificationUserTemplate({ code }: Props) {
  return (
    <Layout>
      <Text>
        Код подтверждения: <Heading>{code}</Heading>
      </Text>

      <Text>
        <Link href={`http://localhost:3000/api/auth/verify?code=${code}`} target='_blank'>
          Подтвердите регистрацию
        </Link>
      </Text>
    </Layout>
  );
}
