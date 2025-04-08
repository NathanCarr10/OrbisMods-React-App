// React import
import React from "react";

// Stripe components for wrapping payment form
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// Import the custom checkout form component
import CheckoutForm from "./CheckoutForm";

// Initialize Stripe with the public key from environment variables
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

// CheckoutPage component that wraps the CheckoutForm with Stripe's Elements provider
const CheckoutPage = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h2>Checkout</h2>

      {/* Stripe Elements wraps the form so it can securely handle card inputs */}
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
};

export default CheckoutPage;
