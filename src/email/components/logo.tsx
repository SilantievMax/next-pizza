import { Column, Img, Row, Section, Text } from '@react-email/components';

export function Logo() {
  const baseUrl = process.env.BASE_URL;

  // todo некорректно отображается
  return (
    <Section>
      <Row>
        <Column style={{ display: 'flex', alignItems: 'center', gap: '16px', paddingBottom: '16px' }}>
          <Img src={`${baseUrl}/logo.png`} alt='logo' width='35' height='35' />

          <div>
            <Text style={{ fontSize: '24px', textTransform: 'uppercase', fontWeight: '900', margin: '0px' }}>Next Pizza</Text>

            <Text style={{ fontSize: '14px', lineHeight: '.75rem', color: '#9ca3af', margin: '0px' }}>вкусней уже нет</Text>
          </div>
        </Column>
      </Row>
    </Section>
  );
}
