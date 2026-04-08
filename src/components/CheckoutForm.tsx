
import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { StripeCardElementOptions, StripeCardElement } from '@stripe/stripe-js';

const CARD_ELEMENT_OPTIONS: StripeCardElementOptions = {
  style: {
    base: {
      color: "#fff",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      '::placeholder': {
        color: "#aab7c4"
      }
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a"
    }
  }
};

interface CheckoutFormProps {
    amount: number;
    onSuccessfulCheckout: () => void;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ amount, onSuccessfulCheckout }) => {
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [succeeded, setSucceeded] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setProcessing(true);

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      setProcessing(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);

    if (cardElement === null) {
        setProcessing(false);
        return;
    }

    // In a real application, you'd create the PaymentIntent on your server
    // and pass the client secret to the client.
    const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ amount: amount * 100 })
    });

    const { clientSecret } = await response.json();


    const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement as unknown as StripeCardElement,
      }
    });

    if (stripeError) {
      setError(`Payment failed: ${stripeError.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      setSucceeded(true);
      onSuccessfulCheckout();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement options={CARD_ELEMENT_OPTIONS} />
      <button disabled={processing || succeeded} id="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold mt-4">
        <span id="button-text">
          {processing ? "Processing..." : `Pay $${amount}`}
        </span>
      </button>
      {error && <div className="card-error" role="alert">{error}</div>}
      {succeeded && <p className="result-message">Payment succeeded!</p>}
    </form>
  );
};

export default CheckoutForm;
