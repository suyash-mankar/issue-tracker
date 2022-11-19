import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

function NavbarComp() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container style={{ margin: "5px" }}>
        <Link to="/" style={styles.link}>
          <Navbar.Brand style={styles.text}>
            <img
              src="https://seeklogo.com/images/G/google-issue-tracker-logo-2D1EE93213-seeklogo.com.png"
              alt="brandLogo"
              style={styles.image}
            />
            Issue Tracker
          </Navbar.Brand>
        </Link>
      </Container>
    </Navbar>
  );
}

const styles = {
  image: {
    width: 50,
    margin: "10px 20px",
  },
  link: {
    textDecoration: "none",
    color: "#2CBF2E"
  },
  text: {
    fontSize: "1.5rem",
    fontFamily: "monospace",
    
  },
};

export default NavbarComp;
