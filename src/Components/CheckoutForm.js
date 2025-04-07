import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { getFirestore, addDoc, collection } from "firebase/firestore";
import { auth } from "../firebase";
import { CartContext } from "../App";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const db = getFirestore();

  const { cartItems, setCartItems } = useContext(CartContext);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setProcessing(true);
    setError(null);

    try {
      console.log("🟡 Sending cart to backend:", cartItems);

      const res = await fetch("http://localhost:4242/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: cartItems }),
      });

      const data = await res.json();
      console.log("🟢 Received from backend:", data);

      if (!data.clientSecret) {
        throw new Error("clientSecret missing from backend response.");
      }

      // Step 2: Confirm card payment
      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      console.log("🔵 Stripe result:", result);

      if (result.error) {
        console.error("Stripe error:", result.error.message);
        setError(result.error.message);
        setProcessing(false);
        return;
      }

      if (result.paymentIntent.status === "succeeded") {
        console.log("✅ Payment succeeded:", result.paymentIntent.id);

        // Step 3: Store order in Firebase
        await addDoc(collection(db, "orders"), {
          userId: auth.currentUser?.uid,
          items: cartItems,
          amount: result.paymentIntent.amount / 100,
          timestamp: new Date(),
        });

        setCartItems([]); // Clear cart
        alert("✅ Payment successful! Order saved.");
        navigate("\OrderHistory.js"); // Redirect to order history
      } else {
        console.warn("⚠️ PaymentIntent status was not succeeded:", result.paymentIntent.status);
        setError("Payment was not successful. Please try again.");
        setProcessing(false);
      }
    } catch (err) {
      console.error("Checkout error:", err.message);
      setError(err.message || "Something went wrong. Please try again.");
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 500, margin: "0 auto" }}>
      <h3>Payment Details</h3>
      <CardElement options={{ hidePostalCode: true }} />
      {error && <p style={{ color: "red" }}>{error}</p>}
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
