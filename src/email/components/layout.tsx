import { ReactNode } from 'react';
import { Logo } from '@/email/components';
import { Column, Font, Head, Hr, Html, Row, Section } from '@react-email/components';

interface Props {
  children: ReactNode;
}

export function Layout({ children }: Props) {
  return (
    <Html lang='ru'>
      <Head>
        <Font
          fontWeight={400}
          fontStyle='normal'
          fontFamily='Roboto'
          fallbackFontFamily='Verdana'
          webFont={{
            url: 'https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2',
            format: 'woff2',
          }}
        />
      </Head>

      <Logo />

      <Hr />

      <Section>
        <Row>
          <Column style={{ paddingTop: '16px' }}>{children}</Column>
        </Row>
      </Section>
    </Html>
  );
}
