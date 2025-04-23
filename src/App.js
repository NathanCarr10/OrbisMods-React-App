// React and routing imports
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { createContext, useState } from 'react';

// Component imports
import Homepage from './Components/Homepage';
import Login from './Components/LoginPage';
import Signup from './Components/Signup';
import { useAuth } from './Components/AuthContext';
import Products from './Components/Products';
import ShoppingCart from './Components/ShoppingCart';
import UserAccount from './Components/UserAccount';
import NavigationBar from './Components/NavigationBar';
import OrderHistory from './Components/OrderHistory';
import CheckoutPage from './Components/CheckoutPage';
import AboutPage from "./Components/AboutPage";
import ProfileSummary from "./Components/ProfileSummary";
import ThankYou from "./Components/ThankYou";


// Stripe integration
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

// Toastify for user notifications
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Load Stripe public key from .env file
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

// Global Cart Context
export const CartContext = createContext(); // Create context for cart state

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]); // State to store cart items

  // Add a product to the cart (with quantity logic)
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find(item => item.id === product.id);
      if (existing) {
        // If item exists, increase its quantity
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      // Add new item with quantity 1
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  // Remove item from cart by index
  const removeFromCart = (indexToRemove) => {
    setCartItems((prevItems) =>
      prevItems.filter((_, index) => index !== indexToRemove)
    );
  };

  // Increase item quantity by ID
  const increaseQuantity = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Decrease item quantity by ID, remove if it hits 0
  const decreaseQuantity = (id) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Manually set cart items (used after checkout or reset)
  const setCartItemsManually = (items) => {
    setCartItems(items);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        setCartItems: setCartItemsManually,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Route Protection Component
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth(); // Check if user is authenticated
  return user ? children : <Navigate to="/LoginPage" />; // Redirect if not logged in
};

// Main App Component
function App() {
  return (
    <CartProvider>
      <Router>
        <NavigationBar /> {/* Global navigation bar */}
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Homepage />} />
          <Route path="/LoginPage" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Products" element={<Products />} />
          <Route path="/About" element={<AboutPage />} />
          <Route path="/ThankYou" element={<ThankYou />} />

          {/* Protected route for user account */}
          <Route
            path="/UserAccount"
            element={
              <ProtectedRoute>
                <UserAccount />
              </ProtectedRoute>
            }
          />

          {/* Shopping cart wrapped with Stripe Elements */}
          <Route
            path="/ShoppingCart"
            element={
              <Elements stripe={stripePromise}>
                <ShoppingCart />
              </Elements>
            }
          />

          {/* Protected route for order history */}
          <Route
            path="/OrderHistory"
            element={
              <ProtectedRoute>
                <OrderHistory />
              </ProtectedRoute>
            }
          />

          {/* Protected Stripe checkout route */}
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <CheckoutPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ProfileSummary"
            element={
              <ProtectedRoute>
                <ProfileSummary />
              </ProtectedRoute>
            }
          />

        </Routes>

        {/* Toast notifications container */}
        <ToastContainer position="top-right" autoClose={3000} />
      </Router>
    </CartProvider>
  );
}

export default App;
