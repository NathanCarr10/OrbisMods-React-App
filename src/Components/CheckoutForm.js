// Import Stripe hooks and components
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

// React imports
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

// Firebase imports
import { getFirestore, addDoc, collection, doc, getDoc } from "firebase/firestore";
import { auth } from "../firebase";

// Cart context
import { CartContext } from "../App";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const db = getFirestore();

  const { cartItems, setCartItems } = useContext(CartContext);

  const [shipping, setShipping] = useState(null); // Store shipping info
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);

  //  Fetch saved user profile from Firestore
  useEffect(() => {
    const fetchShippingInfo = async () => {
      const user = auth.currentUser;
      if (!user) return;

      try {
        const userRef = doc(db, "users", user.uid);
        const snap = await getDoc(userRef);

        if (snap.exists()) {
          setShipping(snap.data());
        }
      } catch (err) {
        console.error("Failed to fetch shipping info:", err);
      }
    };

    fetchShippingInfo();
  }, [db]);

  // Handle Stripe form submission and payment
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setProcessing(true);
    setError(null);

    try {
      // Step 1: Create payment intent with backend
      const res = await fetch("http://localhost:4242/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: cartItems }),
      });

      const data = await res.json();

      if (!data.clientSecret) {
        throw new Error("clientSecret missing from backend response.");
      }

      // Step 2: Confirm card payment
      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      // Step 3: Handle success or failure
      if (result.error) {
        setError(result.error.message);
        setProcessing(false);
        return;
      }

      if (result.paymentIntent.status === "succeeded") {
        // Step 4: Save order to Firestore
        await addDoc(collection(db, "orders"), {
          userId: auth.currentUser?.uid,
          items: cartItems,
          amount: result.paymentIntent.amount / 100,
          shippingInfo: shipping, // Include shipping info in the order
          timestamp: new Date(),
        });

        setCartItems([]);
        navigate("/OrderHistory");
      } else {
        setError("Payment failed. Please try again.");
        setProcessing(false);
      }
    } catch (err) {
      setError(err.message || "An error occurred.");
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 500, margin: "0 auto" }}>
      <h3>Payment Details</h3>
      <CardElement options={{ hidePostalCode: true }} />

      {/* Display saved shipping info for review */}
      {shipping && (
        <div style={{ marginTop: "20px", fontSize: "14px", color: "#555" }}>
          <h4>Shipping To:</h4>
          <p>{shipping.fullName}</p>
          <p>{shipping.address}, {shipping.city}, {shipping.postcode}</p>
          <p>{shipping.country}</p>
          <p>Phone: {shipping.phone}</p>
        </div>
      )}

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
