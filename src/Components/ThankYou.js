// React and routing imports
import React from "react";
import { Link } from "react-router-dom";

// ThankYou component shown after successful checkout
const ThankYou = () => {
  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1 style={{ fontSize: "2.5rem", color: "#28a745" }}>Thank You!</h1>

      <p style={{ fontSize: "1.2rem", marginTop: "20px" }}>
        Your order has been successfully placed. We appreciate your business!
      </p>

      <div style={{ marginTop: "30px" }}>
        {/* Link to order history */}
        <Link
          to="/OrderHistory"
          style={{
            marginRight: "20px",
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "white",
            textDecoration: "none",
            borderRadius: "5px"
          }}
        >
          View Order History
        </Link>

        {/* Link to continue shopping */}
        <Link
          to="/Products"
          style={{
            padding: "10px 20px",
            backgroundColor: "#28a745",
            color: "white",
            textDecoration: "none",
            borderRadius: "5px"
          }}
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default ThankYou;
