// Import Stripe hooks and components
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

// React imports
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

// Firebase imports
import { getFirestore, addDoc, collection } from "firebase/firestore";
import { auth } from "../firebase";

// Cart context
import { CartContext } from "../App";

const CheckoutForm = () => {
  // Initialize Stripe and Elements hooks
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const db = getFirestore();

  // Get cart state and method to clear cart
  const { cartItems, setCartItems } = useContext(CartContext);

  // Local state for UI handling
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Abort if Stripe isn't ready
    if (!stripe || !elements) return;

    setProcessing(true);
    setError(null);

    try {
      // Step 1: Send cart items to backend to create a PaymentIntent
      console.log("Sending cart to backend:", cartItems);

      const res = await fetch("http://localhost:4242/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: cartItems }),
      });

      const data = await res.json();
      console.log("Received from backend:", data);

      if (!data.clientSecret) {
        throw new Error("clientSecret missing from backend response.");
      }

      // Step 2: Confirm card payment with Stripe
      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      console.log("Stripe result:", result);

      // Handle Stripe errors
      if (result.error) {
        console.error("Stripe error:", result.error.message);
        setError(result.error.message);
        setProcessing(false);
        return;
      }

      // Step 3: On successful payment, save order to Firestore
      if (result.paymentIntent.status === "succeeded") {
        console.log("Payment succeeded:", result.paymentIntent.id);

        await addDoc(collection(db, "orders"), {
          userId: auth.currentUser?.uid,
          items: cartItems,
          amount: result.paymentIntent.amount / 100, // Convert from cents
          timestamp: new Date(),
        });

        // Clear cart and redirect
        setCartItems([]);
        alert("Payment successful! Order saved.");
        navigate("/OrderHistory");
      } else {
        // Handle any other payment status
        console.warn("PaymentIntent status was not succeeded:", result.paymentIntent.status);
        setError("Payment was not successful. Please try again.");
        setProcessing(false);
      }
    } catch (err) {
      // General error handler
      console.error("Checkout error:", err.message);
      setError(err.message || "Something went wrong. Please try again.");
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 500, margin: "0 auto" }}>
      <h3>Payment Details</h3>

      {/* Stripe Card Input */}
      <CardElement options={{ hidePostalCode: true }} />

      {/* Display errors if any */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={!stripe || processing}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        {processing ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
};

export default CheckoutForm;
