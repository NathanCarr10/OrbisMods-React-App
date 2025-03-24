// Importing necessary components from 'react-router-dom'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Importing Bootstrap CSS for styling the application
import 'bootstrap/dist/css/bootstrap.min.css';

// Importing various custom components used in the app
import Homepage from './Components/Homepage';
import LoginPage from './Components/LoginPage';
import Products from './Components/Products';
import ShoppingCart from './Components/ShoppingCart';
import UserAccount from './Components/UserAccount';
import NavigationBar from './Components/NavigationBar';


// App component is the main component of the application
function App() {
  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/LoginPage" element={<LoginPage />} />
        <Route path="/Products" element={<Products />} />
        <Route path="/ShoppingCart" element={<ShoppingCart/>} />
        <Route path="/UserAccount" element={<UserAccount />} />
      </Routes>
    </Router>
  );
}

//Exporting App component
export default App;
