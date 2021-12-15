import * as React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { useContext } from "react";
import {  useHistory } from "react-router-dom";
import { isLoggedInContext } from "../context/isloggedin";
import { getAuth, signOut } from "firebase/auth";
import {app} from "../config/firebase"

export default function NavBar() {
  const auth = getAuth(app);
  const history = useHistory();
  const {isloggedin , setisloggedin } = useContext(isLoggedInContext);

  function signout(){
    signOut(auth).then(() => {
        setisloggedin(false)
        // history.push('/login')
     }).catch((error) => {alert(error.message)});
    }
  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light" sticky="top">
      <Container>
        <Navbar.Brand >Trip Advisor Admin</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#features"></Nav.Link>
            <Nav.Link href="#pricing"></Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="#deets"></Nav.Link>
           {isloggedin? 
              <Nav.Link onClick={() =>signout()}>
                 Signout
              </Nav.Link>
            :  <Nav.Link eventKey={2} href="#memes">
                Login
              </Nav.Link>
            }
          </Nav>
        </Navbar.Collapse>
      </Container> 
    </Navbar>
  );
}
