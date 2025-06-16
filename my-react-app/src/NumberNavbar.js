// src/components/Navbar.js
import React from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function AppNavbar() {
  return (
    <Navbar style={{ backgroundColor: '#3b1f1f' }} variant="dark" expand="lg">
      <Container fluid className="px-4">
        <Navbar.Brand className="text-white">Combine Numbers</Navbar.Brand>
        <div className="ms-auto">
          <Link to="/">
            <Button variant="light" size="sm">Home</Button>
          </Link>
        </div>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
