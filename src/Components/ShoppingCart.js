import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../App";

const ShoppingCart = () => {
  const { cartItems, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate();

  // Calculate total price
  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2 style={{ marginBottom: "30px" }}>Your Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
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
                <div style={{ flexGrow: 1 }}>
                  <h4 style={{ margin: 0 }}>{item.name}</h4>
                  <p style={{ margin: "8px 0", fontWeight: "bold" }}>${item.price.toFixed(2)}</p>
                </div>
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

          <h4 style={{ marginTop: "30px" }}>Total: ${totalPrice.toFixed(2)}</h4>

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
