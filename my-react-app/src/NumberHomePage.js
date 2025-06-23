// src/components/NumberHomePage.js

import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import additionImage from "./assets/addition-image.png";
import multiplyImage from "./assets/multiplication-image.png";
import easyImage from "./assets/easy-image.png";
import mediumImage from "./assets/medium-image.png";
import hardImage from "./assets/hard-image.png";
import './NumberHomePage.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const additionImg = additionImage;
const multiplyImg = multiplyImage;
const easyImg = easyImage;
const medImg = mediumImage;
const hardImg = hardImage;

function NumberHomePage() {
  const [selectedMode, setSelectedMode] = useState(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.toastMessage) {
      const { toastMessage, toastType } = location.state;
      if (toastType === 'error') {
        toast.error(toastMessage, {
          position: "top-center",
          autoClose: 3000,
        });
      } else {
        toast.success(toastMessage, {
          position: "top-center",
          autoClose: 3000,
        });
      }
      navigate(location.pathname, { replace: true });
    }
  }, [location, navigate]);

  const modes = [
    {
      key: 'addition',
      title: 'Addition',
      img: additionImg,
      desc: 'Combine numbers to match the target sum in this engaging memory game.'
    },
    {
      key: 'multiplication',
      title: 'Multiplication',
      img: multiplyImg,
      desc: 'Multiply numbers to hit the target product and test your math skills.'
    }
  ];

  const levels = [
    { key: 'easy', title: 'Easy', img: easyImg, desc: 'Ideal for beginners to build confidence.' },
    { key: 'medium', title: 'Medium', img: medImg, desc: 'Great challenge for intermediate players.' },
    { key: 'hard', title: 'Hard', img: hardImg, desc: 'A tough test for advanced players.' }
  ];

  return (
    <Container fluid className="number-homepage-container">
      <ToastContainer />
      <div className="number-homepage-content">
        <h1 className="homepage-title">Combine Numbers</h1>
        <p className="homepage-subtitle">
          Master math and memory with this exciting challenge. Select a mode and difficulty to begin!
        </p>

        <h2 className="section-title" id="game-mode-section">Select Game Mode</h2>
        <Row className="gy-4 mb-5 animate-section">
          {modes.map(mode => (
            <Col key={mode.key} xs={12} md={6} className="d-flex">
              <Card
                className={`neon-card h-100 flex-fill ${selectedMode === mode.key ? 'selected' : ''}`}
                onClick={() => setSelectedMode(mode.key)}
                role="button"
                tabIndex={0}
                onKeyDown={e => e.key === 'Enter' && setSelectedMode(mode.key)}
                aria-pressed={selectedMode === mode.key}
                aria-label={`Select ${mode.title} mode`}
              >
                <Card.Img
                  variant="top"
                  className="card-img"
                  src={mode.img}
                  alt={`${mode.title} mode illustration`}
                />
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="neon-title">{mode.title}</Card.Title>
                  <Card.Text className="card-desc flex-grow-1">{mode.desc}</Card.Text>
                  <Button
                    variant={selectedMode === mode.key ? 'glow' : 'outline-glow'}
                    className="mt-auto neon-button"
                    onClick={() => setSelectedMode(mode.key)}
                    aria-label={`Select ${mode.title} mode`}
                  >
                    {selectedMode === mode.key ? 'Selected' : 'Select'} {mode.title}
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <h2 className="section-title" id="difficulty-section">Select Difficulty</h2>
        <Row className="gy-4 mb-5 animate-section">
          {levels.map(level => (
            <Col key={level.key} xs={12} md={4} className="d-flex">
              <Card
                className={`neon-card h-100 flex-fill ${selectedDifficulty === level.key ? 'selected' : ''}`}
                onClick={() => setSelectedDifficulty(level.key)}
                role="button"
                tabIndex={0}
                onKeyDown={e => e.key === 'Enter' && setSelectedDifficulty(level.key)}
                aria-pressed={selectedDifficulty === level.key}
                aria-label={`Select ${level.title} difficulty`}
              >
                <Card.Img
                  variant="top"
                  className="card-img"
                  src={level.img}
                  alt={`${level.title} difficulty illustration`}
                />
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="neon-title">{level.title}</Card.Title>
                  <Card.Text className="card-desc flex-grow-1">{level.desc}</Card.Text>
                  <Button
                    variant={selectedDifficulty === level.key ? 'glow' : 'outline-glow'}
                    className="mt-auto neon-button"
                    onClick={() => setSelectedDifficulty(level.key)}
                    aria-label={`Select ${level.title} difficulty`}
                  >
                    {selectedDifficulty === level.key ? 'Selected' : 'Select'}
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <div className="text-center mt-5">
          <Link to={`/game/${selectedMode}/${selectedDifficulty}`}>
            <Button
              size="lg"
              variant="play-glow"
              disabled={!selectedMode || !selectedDifficulty}
              className="play-button bg-light"
              aria-label="Start the game"
            >
              Let’s Play!
            </Button>
          </Link>
        </div>
      </div>
    </Container>
  );
}

export default NumberHomePage;
