import React from "react";
import Nav from "react-bootstrap/Nav";
import { BiRestaurant } from "react-icons/bi";

import { Button, Container, Form, FormControl, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

export const RestaurantNavbar = () => {
  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Container fluid>
          <Navbar.Brand>
            <BiRestaurant className="fs-2" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Link to="/restaurants-posts">Posts</Link>
            </Nav>
            
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};
