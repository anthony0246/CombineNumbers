// src/components/Navbar.js
import React from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function AppNavbar() {
  return (
    <Navbar
      style={{
        background: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)',
        borderBottom: '2px solid #00e5ff',
        boxShadow: '0 4px 12px rgba(0, 229, 255, 0.4)'
      }}
      variant="dark"
      expand="lg"
    >
      <Container fluid className="px-4">
        <Navbar.Brand style={{ color: '#00e5ff', fontWeight: '600', fontSize: '2rem' }}>
          Combine Numbers
        </Navbar.Brand>
        <div className="ms-auto">
          <Link to="/">
            <Button
              variant="outline-info"
              size="lg"
              style={{
                borderColor: '#00e5ff',
                color: '#00e5ff',
                fontWeight: '500'
              }}
            >
              Home
            </Button>
          </Link>
        </div>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
