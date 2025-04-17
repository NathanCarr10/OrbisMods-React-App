// React and context imports
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

// Firebase Firestore imports
import { getFirestore, collection, getDocs } from "firebase/firestore";

// Global cart context import
import { CartContext } from "../App";

// Toastify import for notifications
import { toast } from "react-toastify";

// Products component displays a list of available products from Firestore
const Products = () => {
  const [products, setProducts] = useState([]); // State to store fetched products
  const { addToCart } = useContext(CartContext); // Access addToCart from context
  const navigate = useNavigate(); // For redirecting after add-to-cart

  // Fetch products on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      const db = getFirestore(); // Get Firestore instance

      try {
        // Get all documents from "products" collection
        const snapshot = await getDocs(collection(db, "products"));

        // Map Firestore docs into usable product objects
        const items = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setProducts(items); // Update state with product list
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Handle adding a product to the cart and redirect to shopping cart page
  const handleAddToCart = (product) => {
    addToCart(product); // Add product to global cart state
    toast.success(`${product.name} added to cart!`); // Show success notification
    navigate("/ShoppingCart"); // Redirect user after adding to cart
  };

  return (
    <div style={{ padding: "40px" }}>
      {/* Page heading */}
      <h2 style={{ fontSize: "32px", marginBottom: "30px", textAlign: "center" }}>
        Shop Our Collection
      </h2>

      {/* Grid layout for displaying product cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: "30px",
        }}
      >
        {products.map(product => (
          <div
            key={product.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "15px",
              padding: "20px",
              textAlign: "center",
              boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
              backgroundColor: "#fff",
              transition: "transform 0.2s, box-shadow 0.2s",
              cursor: "pointer",
            }}
            // Hover effects for product cards
            onMouseEnter={e => {
              e.currentTarget.style.transform = "scale(1.03)";
              e.currentTarget.style.boxShadow = "0 6px 14px rgba(0,0,0,0.15)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 4px 10px rgba(0,0,0,0.08)";
            }}
          >
            {/* Product image */}
            {product.image && (
              <img
                src={product.image}
                alt={product.name}
                style={{
                  width: "100%",
                  height: "250px",
                  objectFit: "cover",
                  borderRadius: "10px",
                  marginBottom: "15px"
                }}
              />
            )}

            {/* Product name */}
            <h4 style={{ fontSize: "20px", margin: "10px 0" }}>
              {product.name}
            </h4>

            {/* Product price */}
            <p style={{ fontSize: "18px", fontWeight: "bold", color: "#333" }}>
              ${product.price.toFixed(2)}
            </p>

            {/* Product description */}
            <p style={{ fontSize: "14px", color: "#666", marginBottom: "15px" }}>
              {product.description}
            </p>

            {/* Add to Cart button */}
            <button
              onClick={() => handleAddToCart(product)}
              style={{
                padding: "10px 20px",
                fontSize: "16px",
                backgroundColor: "#28a745",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer"
              }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
