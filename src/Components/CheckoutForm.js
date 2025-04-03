import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { getFirestore, addDoc, collection } from "firebase/firestore";
import { useContext } from "react";
import { CartContext } from "../App";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const { cartItems, setCartItems } = useContext(CartContext);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setProcessing(true);

    // Step 1: Create PaymentIntent (backend API call)
    const res = await fetch("http://localhost:4242/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: cartItems }),
    });

    const { clientSecret } = await res.json();

    // Step 2: Confirm Card Payment
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (result.error) {
      setError(result.error.message);
      setProcessing(false);
    } else {
      if (result.paymentIntent.status === "succeeded") {
        // Step 3: Store order in Firebase
        const db = getFirestore();
        await addDoc(collection(db, "orders"), {
          userId: auth.currentUser.uid,
          items: cartItems,
          amount: result.paymentIntent.amount / 100,
          timestamp: new Date(),
        });

        setCartItems([]); // Clear cart
        alert("Payment successful! Order saved.");
        navigate("/OrderHistory");
      }
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
// This component handles the Stripe payment process and stores the order in Firebase
// after a successful payment. It uses the Stripe API to create a PaymentIntent and confirm the card payment.