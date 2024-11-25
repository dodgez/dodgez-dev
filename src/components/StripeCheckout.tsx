import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';

import CheckoutForm from './CheckoutForm';
import CompletePage from './CompletePage';

const stripePromise = loadStripe(import.meta.env.PUBLIC_STRIPE_KEY);

interface ServerResponse {
  clientSecret: string;
  dpmCheckerLink: string;
}

export default function StripeCheckout() {
  const [clientSecret, setClientSecret] = useState('');
  const [dpmCheckerLink, setDpmCheckerLink] = useState('');

  useEffect(() => {
    if (window.location.hash === '#complete') {
      return;
    }

    fetch('/payment', {
      body: JSON.stringify({}),
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
    })
      .then((res) => res.json())
      .then((data: ServerResponse) => {
        setClientSecret(data.clientSecret);
        // [DEV] For demo purposes only
        setDpmCheckerLink(data.dpmCheckerLink);
      })
      .catch((e: unknown) => {
        console.error(e);
      });
  }, []);

  const appearance: { theme: 'stripe' } = {
    theme: 'stripe',
  };
  // Enable the skeleton loader UI for optimal loading.
  const loader = 'auto';

  return window.location.hash !== '#complete' ? (
    clientSecret && (
      <Elements
        options={{ appearance, clientSecret, loader }}
        stripe={stripePromise}
      >
        <CheckoutForm dpmCheckerLink={dpmCheckerLink} />
      </Elements>
    )
  ) : (
    <Elements options={{ appearance, loader }} stripe={stripePromise}>
      <CompletePage />
    </Elements>
  );
}
