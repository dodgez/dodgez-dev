import {
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import type { StripePaymentElementOptions } from '@stripe/stripe-js';
import type { FormEvent } from 'react';
import { useState } from 'react';

export default function CheckoutForm({
  dpmCheckerLink,
}: {
  dpmCheckerLink: string;
}) {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      confirmParams: {
        return_url: window.location.origin + '/buyCoffee#complete',
      },
      elements,
    });

    if (error.type === 'card_error' || error.type === 'validation_error') {
      setMessage(error.message);
    } else {
      setMessage('An unexpected error occurred.');
    }

    setIsLoading(false);
  };

  const paymentElementOptions: StripePaymentElementOptions = {
    layout: 'accordion',
  };

  return (
    <>
      <p className="mb-4">
        If you like this site and the tools hosted here, consider buying me a
        coffee.
      </p>
      <form
        className="flex-col flex w-full"
        id="payment-form"
        onSubmit={(e) => {
          void handleSubmit(e);
        }}
      >
        <PaymentElement id="payment-element" options={paymentElementOptions} />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold mt-4 py-2 px-4 rounded"
          disabled={isLoading || !stripe || !elements}
          id="submit"
        >
          {isLoading ? 'loading' : 'Buy $5 coffee'}
        </button>
        {message && <div id="payment-message">{message}</div>}
      </form>
      <a
        className="link link-primary"
        href={dpmCheckerLink}
        id="dpm-integration-checker"
        rel="noopener noreferrer"
        target="_blank"
      >
        dpmCheckerLink
      </a>
    </>
  );
}
