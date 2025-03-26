import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Homepage from './Components/Homepage';
import Login from './Components/LoginPage';
import Signup from './Components/Signup';
import Logout from './Components/Logout';
import { useAuth } from './Components/AuthContext';
import Products from './Components/Products';
import ShoppingCart from './Components/ShoppingCart';
import UserAccount from './Components/UserAccount';
import NavigationBar from './Components/NavigationBar';
import OrderHistory from './Components/OrderHistory';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/UserAccount" />;
};

function App() {
  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Homepage />} exact />
        <Route path="/LoginPage" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/UserAccount" element={<ProtectedRoute><h2>Welcome! <Logout /></h2></ProtectedRoute>} />
        <Route path="/Products" element={<Products />} />
        <Route path="/ShoppingCart" element={<ShoppingCart />} />
        <Route path="/UserAccount" element={<UserAccount />} />
        <Route path="/OrderHistory" element={<OrderHistory />} />
      </Routes>
    </Router>
  );
}

export default App;
