import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { createContext, useState } from 'react';

import Homepage from './Components/Homepage';
import Login from './Components/LoginPage';
import Signup from './Components/Signup';
import { useAuth } from './Components/AuthContext';
import Products from './Components/Products';
import ShoppingCart from './Components/ShoppingCart';
import UserAccount from './Components/UserAccount';
import NavigationBar from './Components/NavigationBar';
import OrderHistory from './Components/OrderHistory';

// ✅ Stripe Imports
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';


const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

// Cart Context Setup
export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((prevItems) => [...prevItems, product]);
  };

  const removeFromCart = (indexToRemove) => {
    setCartItems((prevItems) =>
      prevItems.filter((_, index) => index !== indexToRemove)
    );
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Protected Route
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/LoginPage" />;
};

function App() {
  return (
    <CartProvider>
      <Router>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/LoginPage" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />

          <Route
            path="/UserAccount"
            element={
              <ProtectedRoute>
                <UserAccount />
              </ProtectedRoute>
            }
          />

          <Route path="/Products" element={<Products />} />

          {/* ✅ Stripe-wrapped ShoppingCart Route */}
          <Route
            path="/ShoppingCart"
            element={
              <Elements stripe={stripePromise}>
                <ShoppingCart />
              </Elements>
            }
          />

          <Route
            path="/OrderHistory"
            element={
              <ProtectedRoute>
                <OrderHistory />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
