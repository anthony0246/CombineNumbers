import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';




function generateCardsForAdditionMedium() {
  const pairs = [
    [9, 9],
    [10, 8],
    [11, 7],
    [12, 6],
    [13, 5],
    [14, 4],
    [15, 3],
    [16, 2],
  ];
  const cards = pairs.flat().map((value, idx) => ({
    id: idx,
    value,
    matched: false,
  }));
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
  return { target: 18, cards };
}

export default function MediumAddition() {
  const { mode, difficulty } = useParams();
  
  const [target, setTarget] = useState(null);
  const [cards, setCards] = useState([]);
  const gameWon = cards.every(card => card.matched);
  const [flipped, setFlipped] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [matchesCount, setMatchesCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (mode === 'addition' && difficulty === 'medium') {
      const { target, cards } = generateCardsForAdditionMedium();
      setTarget(target);
      setCards(cards);
    }
  }, [mode, difficulty]);

  function handleCardClick(cardId) {
    if (disabled) return;
    if (cards.find(c => c.id === cardId)?.matched) return;
    if (flipped.includes(cardId)) {
      setFlipped(flipped.filter(id => id !== cardId));
      return;
    }

    if (flipped.length === 0) {
      setFlipped([cardId]);
      return;
    }

    if (flipped.length === 1) {
      const firstCardId = flipped[0];
      const secondCardId = cardId;
      setFlipped([firstCardId, secondCardId]);
      setDisabled(true);

      const firstCard = cards.find(c => c.id === firstCardId);
      const secondCard = cards.find(c => c.id === secondCardId);

      if (firstCard.value + secondCard.value === target) {
        setTimeout(() => {
          setCards(prev =>
            prev.map(c =>
              c.id === firstCardId || c.id === secondCardId
                ? { ...c, matched: true }
                : c
            )
          );
          setFlipped([]);
          setDisabled(false);
          setMatchesCount(prev => prev + 2);
        }, 1000);
      } else {
        setTimeout(() => {
          setFlipped([]);
          setDisabled(false);
        }, 1500);
      }
    }
  }

  if (mode !== 'addition' || difficulty !== 'medium') {
    return <Container className="text-center py-5">Invalid game mode.</Container>;
  }

  if (cards.length === 0) {
    return <Container className="text-center py-5">Loading game...</Container>;
  }

  return (
    <div style={styles.page}>
      <Container className="text-center py-5">
        <h2 style={styles.title}>Add Numbers</h2>
        <p style={styles.subtitle}>
          Try to match cards that sum to{' '}
          <span style={styles.highlight}>{target}</span>
        </p>

        <Row style={styles.cardGrid}>
          {cards.map(card => {
            const gameWon = cards.every(card => card.matched);
            const isFlipped = flipped.includes(card.id) || card.matched || gameWon;
            return (
        <Col xs={3} key={card.id} style={styles.col}>
            <div
              onClick={() => handleCardClick(card.id)}
              style={{
                ...styles.cardContainer,
                visibility: gameWon ? 'visible' : (card.matched ? 'hidden' : 'visible'),
                transition: 'visibility 0.5s ease',
              }}
            >
            <div
              style={{
              ...styles.cardInner,
              ...(card.matched ? styles.matchedAnimation : {}),
                  transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                cursor: card.matched ? 'default' : 'pointer',
              boxShadow: card.matched
                ? '0 0 30px #00ff94'
                : '0 8px 16px rgba(0,0,0,0.7)',
              background: card.matched
                ? 'rgba(0, 255, 148, 0.2)'
                : 'rgba(255,255,255,0.1)',
              color: card.matched ? '#00ff94' : '#00e5ff',
              width: 120,
              height: 160,
            }}
          >
            <div style={{ ...styles.cardFace, ...styles.cardFront }}>
              ?
            </div>
            <div style={{ ...styles.cardFace, ...styles.cardBack }}>
              {card.value}
                </div>
              </div>
            </div>
          </Col>
        );
      })}
      </Row>

        {gameWon && (
            <div style={styles.congratsContainer}>
            <h3 style={styles.congratsText}>
                 🎉 Congratulations! You matched all cards! 🎉
            </h3>
            <Button
              variant="outline-light"
              size="lg"
              onClick={() => navigate('/')}
              style={{ marginTop: 20 }}
             >
              Back to Home
             </Button>
            </div>
          )}

      </Container>
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    background: `linear-gradient(135deg, #0f2027, #203a43, #2c5364)`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    color: 'white',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  title: {
    fontWeight: '700',
    fontSize: '3rem',
    marginBottom: 10,
    textShadow: '0 0 10px #00f0ff',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: '1.25rem',
    marginBottom: 30,
    fontWeight: '500',
    textAlign: 'center',
  },
  highlight: {
    color: '#00e5ff',
    fontWeight: '700',
    textShadow: '0 0 8px #00e5ff',
    fontSize: "2rem",
  },
    cardGrid: {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
  gap: 20,           // Includes both row and column gap
  rowGap: 50,        // Extra vertical spacing if needed
  maxWidth: 640,
  margin: '0 auto',
},
  col: {
    display: 'flex',
    justifyContent: 'center',
  },
  cardContainer: {
    width: '100%',
    height: 130,
    perspective: 1000,
  },
  cardInner: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
    position: 'relative',
    textAlign: 'center',
    transition: 'transform 0.6s',
    transformStyle: 'preserve-3d',
    fontSize: '3rem',
    fontWeight: '700',
    userSelect: 'none',
  },
  cardFace: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',
    borderRadius: 16,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: 'inset 0 0 10px #00e5ff',
  },
  cardFront: {
    background: 'rgba(0, 0, 0, 0.6)',
    color: '#00e5ff',
    border: '2px solid #00e5ff',
  },
  cardBack: {
    background: 'linear-gradient(135deg, #00e5ff, #006fbb)',
    color: 'white',
    transform: 'rotateY(180deg)',
    boxShadow: '0 0 20px #00e5ff',
    border: '2px solid #00bfff',
  },
  congratsContainer: {
    marginTop: 40,
    animation: 'fadeIn 1.5s ease forwards',
  },
  congratsText: {
    fontSize: '2rem',
    color: '#00ff94',
    textShadow: '0 0 15px #00ff94',
    marginTop: '5%',
  },

  matchedAnimation: {
  animation: 'fadeOutScale 1s forwards',
},
'@keyframes fadeOutScale': {
  '0%': {
    opacity: 1,
    transform: 'scale(1)',
  },
  '100%': {
    opacity: 0,
    transform: 'scale(0.1)',
  },
},
};
