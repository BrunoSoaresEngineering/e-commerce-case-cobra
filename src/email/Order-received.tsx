/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-use-before-define */
import type { ShippingAddress } from '@prisma/client';
import {
  Body, Column, Container, Head, Heading, Hr, Html, Img, Preview, Row, Section, Text,
} from '@react-email/components';

type OrderReceivedProps = {
  shippingAddress: ShippingAddress,
  orderId: string,
  orderDate: string,
};
function OrderReceived({ shippingAddress, orderId, orderDate }: OrderReceivedProps) {
  const baseUrl = process.env.KINDE_SITE_URL ?? 'http://localhost:3000';
  return (
    <Html>
      <Head />
      <Preview>Congratulations on your new phone case!</Preview>
      <Body style={body}>
        <Container style={container}>
          <Section style={message}>
            <Img
              src={`${baseUrl}/snake-3.png`}
              width="65"
              height="73"
              alt="delivery snake"
              style={{ margin: 'auto' }}
            />
            <Heading style={heading}>Thank you for your order!</Heading>
            <Text style={text}>
              We&apos;re preparing everything for delivery and will notify you once
              your package has been shipped. Delivery usually takes 2 days.
            </Text>
            <Text style={{ ...text, marginTop: 24 }}>
              If you have any questions regarding your order, please feel free
              to contact us with your order number and we&apos;re here to help.
            </Text>
          </Section>

          <Hr style={hr} />

          <Section style={defaultPadding}>
            <Text style={addressTitle}>
              Shipping to:
              {' '}
              {shippingAddress.name}
            </Text>
            <Text style={text}>
              {shippingAddress.street}, {shippingAddress.city},
              {' '}
              {shippingAddress.state} {shippingAddress.postalCode}
            </Text>
          </Section>

          <Hr style={hr} />

          <Section style={defaultPadding}>
            <Row style={{ display: 'inline-flex gap-16', marginBottom: 40 }}>
              <Column>
                <Text style={paragraphWithBold}>Order Number</Text>
                <Text style={trackNumber}>{orderId}</Text>
              </Column>
              <Column>
                <Text style={paragraphWithBold}>Order Date</Text>
                <Text style={trackNumber}>{orderDate}</Text>
              </Column>
            </Row>
          </Section>

          <Hr style={hr} />

          <Section style={paddingY}>
            <Row>
              <Text style={footerText}>
                Please contact us if you have any questions. (If you reply to
                this email, we won&apos;t be able to see it.)
              </Text>
            </Row>
            <Row>
              <Text style={footerCopy}>
                &copy; CaseCobra, Inc. All Rights Reserved
              </Text>
            </Row>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
export default OrderReceived;

const body = {
  backgroundColor: '#ffffff',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const paragraph = {
  margin: 0,
  lineHeight: 2,
};

const paragraphWithBold = {
  ...paragraph,
  fontWeight: 'bold',
};

const paddingX = {
  paddingLeft: '40px',
  paddingRight: '40px',
};

const paddingY = {
  paddingTop: '22px',
  paddingBottom: '22px',
};

const defaultPadding = {
  ...paddingX,
  ...paddingY,
};

const container = {
  margin: '10px auto',
};

const message = {
  padding: '40px 74px',
  textAlign: 'center',
} as React.CSSProperties;

const heading = {
  fontSize: '32px',
  lineHeight: '1.3',
  fontWeight: '700',
  textAlign: 'center',
  letterSpacing: '-1px',
} as React.CSSProperties;

const text = {
  ...paragraph,
  color: '#747474',
  fontWeight: '500',
};

const hr = {
  borderColor: '#E5E5E5',
  margin: 0,
};

const addressTitle = {
  ...paragraph,
  fontSize: '15px',
  fontWeight: 'bold',
};

const trackNumber = {
  margin: '12px 0 0 0',
  fontWeight: 500,
  lineHeight: 1.4,
  color: '#6F6F6F',
};

const footerText = {
  margin: '0',
  color: '#AFAFAF',
  fontSize: '13px',
  textAlign: 'center',
  paddingTop: 30,
  paddingBottom: 30,
} as React.CSSProperties;

const footerCopy = {
  margin: '0',
  color: '#AFAFAF',
  fontSize: '13px',
  textAlign: 'center',
} as React.CSSProperties;

OrderReceived.PreviewProps = {
  shippingAddress: {
    id: crypto.randomUUID(),
    name: 'João',
    phoneNumber: '9999999999',
    street: 'Rua do Outono',
    postalCode: '0000-000',
    city: 'Marte',
    state: 'Solar System',
    country: 'Universe',
  },
  orderId: 'cm2hig2my00026gwrogtio8dn',
  orderDate: '10/15/2024',
} satisfies OrderReceivedProps;
