// Load environment variables
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const app = express();
app.use(cors());
app.use(express.json());

// Check if secret key is loaded properly
if (!process.env.STRIPE_SECRET_KEY) {
  console.error("STRIPE_SECRET_KEY is missing from .env file");
  process.exit(1); // Exit the app if the key is missing
}

// Payment Intent Endpoint
app.post("/create-payment-intent", async (req, res) => {
  const { items } = req.body;

  // Basic total calculator
  const totalAmount = items.reduce((sum, item) => {
    const quantity = item.quantity || 1;
    return sum + item.price * quantity;
  }, 0);

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(totalAmount * 100), // Stripe requires cents
      currency: "euro",
      automatic_payment_methods: { enabled: true }, // Supports Google Pay, Apple Pay, etc.
    });

    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Stripe Error:", error);
    res.status(500).json({ error: "Failed to create payment intent" });
  }
});

// ✅ Start the server
const PORT = 4242;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
