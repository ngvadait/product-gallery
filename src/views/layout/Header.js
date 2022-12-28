import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import "./assets/header.scss";

const Header = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Container className="header_custom">
        <Navbar.Brand href="/">Products</Navbar.Brand>
        <Nav className="me-auto">
        </Nav>
      </Container>
    </Navbar>
  )
}

export default Header;