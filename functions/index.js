/* eslint-disable max-len */
// Import Firebase Functions and Admin SDK
const functions = require("firebase-functions");

// Import MailerSend SDK to send transactional emails
const axios = require("axios");

// Load the MailerSend API key from Firebase environment config
const mailersendKey = functions.config().mailersend.key;

// Define the MailerSend API endpoint for sending emails
const MAILERSEND_API_URL = "https://api.mailersend.com/v1/email";

// Export an HTTPS function to send a confirmation email
exports.sendConfirmationEmail = functions.https.onCall(async (data, context) => {
  // Destructure expected fields from the data object
  const {to, name, orderId, total} = data;

  // Validate required fields
  if (!to || !name || !orderId || !total) {
    throw new functions.https.HttpsError(
        "invalid-argument",
        "Missing required fields: to, name, orderId, total",
    );
  }

  try {
    // Compose the email content
    const emailData = {
      from: {
        email: "nathancarr18@gmail.com", // Sender email address
        name: "Orbis Mods", // Sender name
      },
      to: [
        {
          email: to, // Recipient email address (user's email)
          name: name, // Recipient name (user's full name)
        },
      ],
      subject: "Order Confirmation – Orbis Mods",
      html: `
        <h2>Thank you for your order, ${name}!</h2>
        <p>Your order <strong>#${orderId}</strong> has been received.</p>
        <p>Total amount: <strong>$${total}</strong></p>
        <p>We will begin processing your custom watch shortly.</p>
        <br>
        <p>Regards,</p>
        <p>The Orbis Mods Team</p>
      `,
    };

    // Send the email using MailerSend API via Axios
    const response = await axios.post(MAILERSEND_API_URL, emailData, {
      headers: {
        "Authorization": `Bearer ${mailersendKey}`,
        "Content-Type": "application/json",
      },
    });

    // Return success result
    return {success: true, messageId: response.data.message_id};
  } catch (error) {
    console.error("Error sending confirmation email:", error.response?.data || error.message);
    throw new functions.https.HttpsError(
        "internal",
        "Failed to send confirmation email",
    );
  }
});
