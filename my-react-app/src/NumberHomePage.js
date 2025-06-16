// src/components/NumberHomePage.js
import React, { useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import additionImage from "./assets/addition-image.png"
import multiplyImage from "./assets/multiplication-image.png"
import easyImage from "./assets/easy-image.png"
import mediumImage from "./assets/medium-image.png"
import hardImage from "./assets/hard-image.png"

// placeholder images – replace with your real assets
const additionImg = additionImage;
const multiplyImg = multiplyImage;
const easyImg     = easyImage;
const medImg      = mediumImage;
const hardImg     = hardImage;

function NumberHomePage() {
  const [selectedMode, setSelectedMode] = useState(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);

  const modes = [
    { key: 'addition',    title: 'Addition',       img: additionImg, desc: 'Remember the numbers you have already seen and add them up to match the target.' },
    { key: 'multiplication', title: 'Multiplication', img: multiplyImg, desc: 'Keep track of the numbers you reveal and multiply them to get a product equal to the target.' }
  ];

  const levels = [
    { key: 'easy',   title: 'Easy',   img: easyImg, desc: 'Good for beginners.' },
    { key: 'medium', title: 'Medium', img: medImg,  desc: 'A moderate challenge.' },
    { key: 'hard',   title: 'Hard',   img: hardImg, desc: 'For pros only!' }
  ];

  return (
    <Container className="py-5">

      {/* Intro */}
      <h2 className="mb-4">Combine Numbers</h2>
      <p className="lead">
        Reinforce your memory and math skills. Start by choosing a game mode and difficulty below.
      </p>

      {/* Game Mode Cards */}
      <h4 className="mt-5 mb-4">Game Mode</h4>
      <Row className="gy-4">
        {modes.map(mode => (
          <Col key={mode.key} xs={12} md={6}>
            <Card
              className={`h-100 cursor-pointer ${selectedMode === mode.key ? 'border-3 border-primary shadow' : ''}`}
              onClick={() => setSelectedMode(mode.key)}
            >
              <Card.Img variant="top" className="pt-2" src={mode.img} 
                style={{
                    maxHeight: '300px',
                    objectFit: 'contain',
                    width: '100%'
                    }}/>
              <Card.Body className="d-flex flex-column">
                <Card.Title>{mode.title}</Card.Title>
                <Card.Text>{mode.desc}</Card.Text>
                <Button
                  variant={selectedMode === mode.key ? 'primary' : 'outline-primary'}
                  className="mt-auto"
                  onClick={() => setSelectedMode(mode.key)}
                >
                  {selectedMode === mode.key ? 'Selected' : 'Select'} {mode.title}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Difficulty Cards */}
      <h4 className="mt-5 mb-4">Difficulty</h4>
      <Row className="gy-4">
        {levels.map(level => (
          <Col key={level.key} xs={12} md={4}>
            <Card
              className={`h-100 cursor-pointer ${selectedDifficulty === level.key ? 'border-3 border-primary shadow' : ''}`}
              onClick={() => setSelectedDifficulty(level.key)}
            >
              <Card.Img variant="top p-5" src={level.img} />
              <Card.Body className="d-flex flex-column">
                <Card.Title>{level.title}</Card.Title>
                <Card.Text>{level.desc}</Card.Text>
                <Button
                  variant={selectedDifficulty === level.key ? 'secondary' : 'outline-secondary'}
                  className="mt-auto"
                  onClick={() => setSelectedDifficulty(level.key)}
                >
                  {selectedDifficulty === level.key ? 'Selected' : level.title}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Final Play Button */}
      <div className="text-center mt-5">
        <Link to={`/play?mode=${selectedMode}&difficulty=${selectedDifficulty}`}>  
          <Button size="lg" disabled={!selectedMode || !selectedDifficulty}>
            Let’s Play!
          </Button>
        </Link>
      </div>
    </Container>
  );
}

export default NumberHomePage;
