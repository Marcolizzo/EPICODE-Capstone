import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const NavigationBar = () => {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Navbar.Brand href="#home" className="ms-5">EPICODE-Capstone</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="#features">Projects</Nav.Link>
        </Nav>
      </Navbar>
    </>
  );
};

export default NavigationBar;
