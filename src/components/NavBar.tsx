import React from "react";
import { Button, Container, Nav, Navbar as NavbarBS } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { useShoopingCart } from "../context/ShoppingCartContext";

function NavBar() {
    const {cartQuantity, openCart} = useShoopingCart()
    // console.log(cartQuantity)
  return (
    <NavbarBS sticky="top" className="bg-white shadow-sm mb-3">
      <Container className="me-auto">
        <Nav>
          <Nav.Link to="/" as={NavLink}>
            Home
          </Nav.Link>
          <Nav.Link to="/about" as={NavLink}>
            About
          </Nav.Link>
          <Nav.Link to="/store" as={NavLink}>
            Store
          </Nav.Link>
        </Nav>
        {cartQuantity > 0 &&   <Button onClick={()=>openCart()}
          style={{
            width: "3rem",
            height: "3rem",
            borderRadius: "2rem",
            position: "relative",
          }}
          variant="outline-primary"
          className="rouded-circle"
        >
          <HiOutlineShoppingCart />
          <div
            className="rounded-circle bg-danger d-flex justify-content-center align-item-center"
            style={{ color: "white", width: "1.2 rem", height: "1.2rem", fontSize:'15px'}}
          >
            {cartQuantity}
          </div>
        </Button>}
      
      </Container>
    </NavbarBS>
  );
}

export default NavBar;
