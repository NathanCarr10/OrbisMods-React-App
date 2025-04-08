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

// Stripe integration
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

// Load Stripe public key from .env file
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);


// Global Cart Context
export const CartContext = createContext(); // Create context for cart state

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]); // State to store cart items

  // Add a product to the cart
  const addToCart = (product) => {
    setCartItems((prevItems) => [...prevItems, product]);
  };

  // Remove a product from the cart by index
  const removeFromCart = (indexToRemove) => {
    setCartItems((prevItems) =>
      prevItems.filter((_, index) => index !== indexToRemove)
    );
  };

  // Manually set cart items (used after checkout or reset)
  const setCartItemsManually = (items) => {
    setCartItems(items);
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, setCartItems: setCartItemsManually }}
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
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
