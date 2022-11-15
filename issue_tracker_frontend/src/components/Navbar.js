import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

function NavbarComp() {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Link to="/">
          <Navbar.Brand> Issue-Tracker </Navbar.Brand>
        </Link>
        <Link to="/project/create">
          <Button> Create Project</Button>
        </Link>
      </Container>
    </Navbar>
  );
}

export default NavbarComp;
