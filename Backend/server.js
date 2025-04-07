require("dotenv").config(); // Load .env first

const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const app = express();
app.use(cors());
app.use(express.json());

if (!process.env.STRIPE_SECRET_KEY) {
  console.error(" STRIPE_SECRET_KEY not found in .env");
  process.exit(1);
}

app.post("/create-payment-intent", async (req, res) => {
  const { items } = req.body;

  try {
    const totalAmount = items.reduce((total, item) => {
      const quantity = item.quantity || 1;
      return total + item.price * quantity;
    }, 0);

    if (!totalAmount || isNaN(totalAmount)) {
      return res.status(400).json({ error: "Invalid cart total." });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(totalAmount * 100), // Convert to cents
      currency: "usd",
      automatic_payment_methods: { enabled: true }, // For Google/Apple Pay
    });

    console.log("✅ PaymentIntent created:", paymentIntent.id);
    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Stripe error:", error);
    res.status(500).json({ error: "Failed to create PaymentIntent." });
  }
});

const PORT = 4242;
app.listen(PORT, () => {
  console.log(`Stripe server running at http://localhost:${PORT}`);
});
