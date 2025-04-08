// Import Bootstrap components for navigation bar
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

// Import Link from React Router for client-side navigation
import { Link } from "react-router-dom";

// NavigationBar component handles the app's main site navigation
function NavigationBar() {
  return (
    <Navbar
      expand="lg"
      className="bg-body-tertiary"
      bg="dark"
      data-bs-theme="dark"
    >
      <Container fluid>
        {/* Brand/logo that links to homepage */}
        <Navbar.Brand href="/">Orbis Mods</Navbar.Brand>

        {/* Toggle button for responsive navbar on smaller screens */}
        <Navbar.Toggle aria-controls="navbarScroll" />

        {/* Collapsible content (links) */}
        <Navbar.Collapse id="navbarScroll">

          {/* Left-aligned navigation links */}
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/Products">Products</Nav.Link>
            <Nav.Link as={Link} to="/ShoppingCart">Shopping Cart</Nav.Link>
          </Nav>

          {/* Right-aligned navigation links */}
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/LoginPage">Login</Nav.Link>
            <Nav.Link as={Link} to="/Signup">Sign Up</Nav.Link>
            <Nav.Link as={Link} to="/UserAccount">My Account</Nav.Link>
          </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
