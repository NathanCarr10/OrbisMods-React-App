import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom";

function NavigationBar() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
      <Container fluid>
        <Navbar.Brand href="/">Orbis Mods</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          {/* Left-side navigation links */}
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/Products">Products</Nav.Link>
            <Nav.Link as={Link} to="/ShoppingCart">Shopping Cart</Nav.Link>
          </Nav>

          {/* Right-side navigation links */}
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
