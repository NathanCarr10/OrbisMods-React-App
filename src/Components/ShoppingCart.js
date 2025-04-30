// React imports
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

// Import global cart context
import { CartContext } from "../App";

// ShoppingCart component displays items in the user's cart
const ShoppingCart = () => {
  // Access cart context functions and data
  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  } = useContext(CartContext);

  // Initialize navigation function to redirect to checkout
  const navigate = useNavigate();

  // Calculate total cart value with quantities
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Redirect user to checkout page
  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2 style={{ marginBottom: "30px" }}>Your Shopping Cart</h2>

      {/* If cart is empty, show message */}
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {/* Render list of cart items */}
          <div style={{ display: "grid", gap: "20px", gridTemplateColumns: "1fr" }}>
            {cartItems.map((item, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "20px",
                  padding: "20px",
                  border: "1px solid #ccc",
                  borderRadius: "10px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                  backgroundColor: "#fff",
                }}
              >
                {/* Display product image if available */}
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: "120px",
                      height: "120px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                )}

                {/* Display product details and quantity controls */}
                <div style={{ flexGrow: 1 }}>
                  <h4 style={{ margin: 0 }}>{item.name}</h4>
                  <p style={{ margin: "8px 0", fontWeight: "bold" }}>
                    €{item.price.toFixed(2)}
                  </p>

                  {/* Quantity controls */}
                  <div>
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      style={{
                        padding: "5px 10px",
                        marginRight: "10px",
                        fontSize: "14px",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                    >
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => increaseQuantity(item.id)}
                      style={{
                        padding: "5px 10px",
                        marginLeft: "10px",
                        fontSize: "14px",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Button to remove item from cart */}
                <button
                  onClick={() => removeFromCart(index)}
                  style={{
                    padding: "8px 12px",
                    backgroundColor: "#dc3545",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Display total price */}
          <h4 style={{ marginTop: "30px" }}>
            Total: €{totalPrice.toFixed(2)}
          </h4>

          {/* Button to proceed to checkout */}
          <button
            onClick={handleCheckout}
            style={{
              marginTop: "20px",
              padding: "12px 25px",
              fontSize: "16px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Proceed to Checkout
          </button>
        </>
      )}
    </div>
  );
};

export default ShoppingCart;
