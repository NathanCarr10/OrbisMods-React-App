import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Homepage from './Components/Homepage';
import Login from './Components/LoginPage';
import Signup from './Components/Signup';
import { useAuth } from './Components/AuthContext';
import Products from './Components/Products';
import ShoppingCart from './Components/ShoppingCart';
import UserAccount from './Components/UserAccount';
import NavigationBar from './Components/NavigationBar';
import OrderHistory from './Components/OrderHistory';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/LoginPage" />;
};

function App() {
  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/LoginPage" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        
        {/* Protected Route for User Account */}
        <Route 
          path="/UserAccount" 
          element={
            <ProtectedRoute>
              <UserAccount />
            </ProtectedRoute>
          } 
        />
        
        <Route path="/Products" element={<Products />} />
        <Route path="/ShoppingCart" element={<ShoppingCart />} />
        
        {/* Protected Route for Order History */}
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
  );
}

export default App;
