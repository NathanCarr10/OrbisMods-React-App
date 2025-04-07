const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/create-payment-intent", async (req, res) => {
  const { items } = req.body;

  // Calculate total price
  const totalAmount = items.reduce((sum, item) => {
    const quantity = item.quantity || 1;
    return sum + item.price * quantity;
  }, 0);

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(totalAmount * 100), // Convert to cents
      currency: "usd",
      automatic_payment_methods: { enabled: true }, // Google Pay, Apple Pay, etc.
    });

    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Stripe Error:", error);
    res.status(500).json({ error: "Payment Intent Creation Failed" });
  }
});

// Failed Dependency Error Handler
app.listen(4242, () => {
  console.log("🚀 Server running on http://localhost:4242");
});
