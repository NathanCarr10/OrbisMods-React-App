import { useState } from "react";

const ShoppingCart = () => {
  // State to hold items added to the cart
  const [cartItems, setCartItems] = useState([]);

  // Sample list of products (watches)
  const products = [
    { id: 1, name: "Orbis Watch A", price: 199.99 },
    { id: 2, name: "Orbis Watch B", price: 299.99 },
    { id: 3, name: "Orbis Watch C", price: 399.99 },
  ];

  // Function to add a product to the cart
  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  // Function to remove a product from the cart by id
  const removeFromCart = (id) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
  };

  // Calculate total price of items in the cart
  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

  // Temporary checkout handler (we’ll replace this later with Stripe)
  const handleCheckout = () => {
    alert("Proceeding to checkout...");
    // This is where we'll trigger Stripe checkout or show a form in the next step
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Welcome to Orbis Mods Store</h2>
      
      {/* Product Listing */}
      <section style={{ marginBottom: "40px" }}>
        <h3>Products</h3>
        <ul>
          {products.map(product => (
            <li key={product.id} style={{ marginBottom: "10px" }}>
              {product.name} - ${product.price.toFixed(2)}
              <button
                onClick={() => addToCart(product)}
                style={{
                  marginLeft: "10px",
                  padding: "5px 10px",
                  backgroundColor: "#28a745",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer"
                }}
              >
                Add to Cart
              </button>
            </li>
          ))}
        </ul>
      </section>

      {/* Shopping Cart */}
      <section>
        <h3>Your Shopping Cart</h3>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <ul>
              {cartItems.map((item, index) => (
                <li key={index} style={{ marginBottom: "10px" }}>
                  {item.name} - ${item.price.toFixed(2)}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    style={{
                      marginLeft: "10px",
                      padding: "5px 10px",
                      backgroundColor: "#dc3545",
                      color: "#fff",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer"
                    }}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
            <h4>Total: ${totalPrice.toFixed(2)}</h4>

            {/* Checkout Button */}
            <button
              onClick={handleCheckout}
              style={{
                marginTop: "20px",
                padding: "10px 20px",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer"
              }}
            >
              Proceed to Checkout
            </button>
          </>
        )}
      </section>
    </div>
  );
};

export default ShoppingCart;
