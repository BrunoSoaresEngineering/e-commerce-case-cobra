import { db } from '@/db/client';
import { stripe } from '@/lib/stripe';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { Resend } from 'resend';
import OrderReceived from '@/email/Order-received';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const signature = headers().get('stripe-signature');

    if (!signature) {
      return new Response('Bad Request', { status: 400 });
    }

    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );

    if (event.type === 'checkout.session.completed') {
      if (!event.data.object.customer_details?.email) {
        throw new Error('Missing user email');
      }

      const data = event.data.object;

      const { userId, orderId } = data.metadata || {
        userId: null,
        orderId: null,
      };

      if (!userId || !orderId) {
        throw new Error('Invalid request Metadata');
      }

      const billingAddress = data.customer_details!.address as Stripe.Address;
      const shippingAddressTest = data.shipping_details!.address as Stripe.Address;

      const updatedOrder = await db.order.update({
        where: { id: orderId },
        data: {
          isPaid: true,
          shippingAddress: {
            create: {
              name: data.customer_details!.name!,
              phoneNumber: data.customer_details!.phone,
              city: shippingAddressTest.city!,
              country: shippingAddressTest.country!,
              state: shippingAddressTest.state,
              street: `${shippingAddressTest.line1} ${shippingAddressTest.line2}`,
              postalCode: shippingAddressTest.postal_code!,
            },
          },
          billingAddress: {
            create: {
              name: data.customer_details!.name!,
              phoneNumber: data.customer_details!.phone,
              city: billingAddress.city!,
              country: billingAddress.country!,
              state: billingAddress.state,
              street: `${billingAddress.line1} ${billingAddress.line2}`,
              postalCode: billingAddress.postal_code!,
            },
          },
        },
        include: {
          shippingAddress: true,
        },
      });

      await resend.emails.send({
        from: 'CaseCobra <brunommsoares@outlook.com>',
        to: [event.data.object.customer_details.email],
        subject: 'Congratulations on your new phone case!',
        react: OrderReceived({
          orderId,
          orderDate: updatedOrder.createdAt.toLocaleDateString(),
          shippingAddress: updatedOrder.shippingAddress!,
        }),
      });
    }

    return NextResponse.json({ result: event, ok: true });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: 'Something went wrong!', ok: false },
      { status: 500 },
    );
  }
}
