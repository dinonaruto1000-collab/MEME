import { useEffect, useState } from "react";
import { Container, Nav, Navbar, Modal, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../../assets/logo/logo.png";
import "../../styles/header.css";
import { useCart } from "../../context/CartContext";

function Header() {
  const [nav, setNav] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const { cartItems } = useCart();

  const changeValueOnScroll = () => {
    const scrollvalue = document?.documentElement?.scrollTop;
    scrollvalue > 100 ? setNav(true) : setNav(false);
  };
  useEffect(() => {
    window.addEventListener("scroll", changeValueOnScroll);
    return () => window.removeEventListener("scroll", changeValueOnScroll);
  }, []);

  const totalItems = cartItems.reduce(
    (acc, item) => acc + (item.quantity || 1),
    0
  );

  return (
    <header>
      <Navbar
        collapseOnSelect
        expand="lg"
        className={`${nav === true ? "sticky" : ""}`}
      >
        <Container>
          <Navbar.Brand href="#home">
            <Link to={"/"} className="logo">
              <img src={logo} alt="Logo" className="img-fluid" />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#about">About</Nav.Link>
              <Nav.Link href="#menu">Our Menu</Nav.Link>
              <Nav.Link href="#shop">Shop</Nav.Link>
              <Nav.Link href="#blog">Blog</Nav.Link>
              <Nav.Link href="#contact">Contact</Nav.Link>

              {/* Login Button */}
              <Nav.Link
                onClick={() => setShowAuth(true)}
                className="btn_login ms-lg-3"
              >
                <i className="bi bi-person fs-5 me-1"></i> Login
              </Nav.Link>

              <Nav.Link as={Link} to="/cart">
                <div className="cart">
                  <i className="bi bi-bag fs-5"></i>
                  {cartItems.length > 0 && (
                    <em className="roundpoint">{totalItems}</em>
                  )}
                </div>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Login / Signup Modal */}
      <Modal show={showAuth} onHide={() => setShowAuth(false)} centered>
        <Modal.Header closeButton className="border-0 pb-0"></Modal.Header>
        <Modal.Body className="px-5 pb-5 text-center">
          <h2 className="fw-bold mb-4">{isLogin ? "Welcome Back!" : "Create Account"}</h2>
          
          <Form>
            {!isLogin && (
              <Form.Group className="mb-3">
                <Form.Control type="text" placeholder="Full Name" className="py-2" />
              </Form.Group>
            )}
            <Form.Group className="mb-3">
              <Form.Control type="email" placeholder="Email Address" className="py-2" />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Control type="password" placeholder="Password" className="py-2" />
            </Form.Group>
            
            <Button variant="danger" className="w-100 py-2 mb-3 order_btn" onClick={() => setShowAuth(false)}>
              {isLogin ? "Login" : "Sign Up"}
            </Button>
          </Form>

          <p className="mb-0">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <span 
              className="text-danger fw-bold ms-2 cursor-pointer" 
              style={{ cursor: 'pointer' }}
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Register Here" : "Login Now"}
            </span>
          </p>
        </Modal.Body>
      </Modal>
    </header>
  );
}

export default Header;
