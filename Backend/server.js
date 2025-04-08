require("dotenv").config(); // Load environment variables from .env file

const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY); // Initialize Stripe with secret key

const app = express();

// Middleware setup
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse incoming JSON requests

// Validate Stripe secret key is present
if (!process.env.STRIPE_SECRET_KEY) {
  console.error("STRIPE_SECRET_KEY not found in .env");
  process.exit(1); // Exit the server if Stripe key is missing
}

// Endpoint to create a PaymentIntent
app.post("/create-payment-intent", async (req, res) => {
  const { items } = req.body;

  try {
    // Calculate total cart amount from item prices and quantities
    const totalAmount = items.reduce((total, item) => {
      const quantity = item.quantity || 1;
      return total + item.price * quantity;
    }, 0);

    // Validate that totalAmount is a valid number
    if (!totalAmount || isNaN(totalAmount)) {
      return res.status(400).json({ error: "Invalid cart total." });
    }

    // Create a PaymentIntent with Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(totalAmount * 100), // Convert dollars to cents
      currency: "usd",
      automatic_payment_methods: { enabled: true }, // Enable support for Google/Apple Pay
    });

    console.log("PaymentIntent created:", paymentIntent.id);

    // Send clientSecret to frontend for payment confirmation
    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Stripe error:", error);
    res.status(500).json({ error: "Failed to create PaymentIntent." });
  }
});

// Start the server
const PORT = 4242;
app.listen(PORT, () => {
  console.log(`Stripe server running at http://localhost:${PORT}`);
});
