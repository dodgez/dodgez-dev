import stripeModule from 'stripe';
const stripe = new stripeModule(import.meta.env.STRIPE_SECRET_KEY);

export async function POST() {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 500, // 5 dollars
    currency: 'usd',
  });

  return new Response(
    JSON.stringify({
      clientSecret: paymentIntent.client_secret,
      // [DEV]: For demo purposes only, you should avoid exposing the PaymentIntent ID in the client-side code.
      dpmCheckerLink: `https://dashboard.stripe.com/settings/payment_methods/review?transaction_id=${paymentIntent.id}`,
    }),
    {
      headers: {
        'Content-Type': 'application/json',
      },
      status: 200,
    },
  );
}
