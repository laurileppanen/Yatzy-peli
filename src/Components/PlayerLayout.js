import React, { useState } from 'react';
import styles from '../PlayerLayout.module.css';
import ScoreTable from './ScoreTable';
import Player from './Player';

const PlayerLayout = ({ children }) => {
  const [scores, setScores] = useState({
    1: {},
    2: {},
    3: {},
    4: {},
  });

  const [currentPlayer, setCurrentPlayer] = useState(1);

  const updateScore = (playerNumber, category) => {
    const selectedDice = selectedDicePerPlayer[playerNumber];
    if (selectedDice) {
      setScores((prevScores) => ({
        ...prevScores,
        [playerNumber]: {
          ...prevScores[playerNumber],
          [category]: calculateCategoryScore(category, selectedDice),
        },
      }));
    }
  };

  const [selectedDicePerPlayer, setSelectedDicePerPlayer] = useState({
    1: [],
    2: [],
    3: [],
    4: [],
  });

  const handleDiceSelected = (playerNumber, dice) => {
    setSelectedDicePerPlayer((prevSelectedDice) => ({
      ...prevSelectedDice,
      [playerNumber]: dice,
    }));
  };

  const onNextPlayer = () => {
    setCurrentPlayer((prevPlayer) => (prevPlayer % 4) + 1);
  };

  const calculateCategoryScore = (category, dice) => {
    if (category === 'ykköset') {
      return dice.filter((value) => value === 1).reduce((acc, value) => acc + value, 0);
    }
    if (category === 'kakkoset') {
      return dice.filter((value) => value === 2).reduce((acc, value) => acc + value, 0);
    }
    if (category === 'kolmoset') {
      return dice.filter((value) => value === 3).reduce((acc, value) => acc + value, 0);
    }
    if (category === 'neloset') {
      return dice.filter((value) => value === 4).reduce((acc, value) => acc + value, 0);
    }
    if (category === 'viitoset') {
      return dice.filter((value) => value === 5).reduce((acc, value) => acc + value, 0);
    }
    if (category === 'kuutoset') {
      return dice.filter((value) => value === 6).reduce((acc, value) => acc + value, 0);
    }
    if (category === 'pari') {
      const counts = Array(6).fill(0);
      dice.forEach((value) => {
        counts[value - 1]++;
      });
      const pairIndex = counts.findIndex((count) => count === 2);
      return pairIndex >= 0 ? (pairIndex + 1) * 2 : 0;
    }
    if (category === 'kaksi paria') {
      const counts = Array(6).fill(0);
      dice.forEach((value) => {
        counts[value - 1]++;
      });
      const pairs = counts.filter((count) => count >= 2);
      if (pairs.length >= 2) {
        const pairIndices = [];
        for (let i = 0; i < counts.length; i++) {
          if (counts[i] >= 2) {
            pairIndices.push(i + 1);
          }
        }
        return pairIndices.slice(0, 2).reduce((acc, value) => acc + value * 2, 0);
      } else {
        return 0;
      }
    }
    if (category === 'kolme samaa') {
      const counts = Array(6).fill(0);
      dice.forEach((value) => {
        counts[value - 1]++;
      });
    
      const threeOfAKindIndex = counts.findIndex((count) => count >= 3);
      return threeOfAKindIndex >= 0 ? (threeOfAKindIndex + 1) * 3 : 0;
    }
    if (category === 'neljä samaa') {
      const counts = Array(6).fill(0);
      dice.forEach((value) => {
        counts[value - 1]++;
      });
    
      const fourOfAKindIndex = counts.findIndex((count) => count >= 4);
      return fourOfAKindIndex >= 0 ? (fourOfAKindIndex + 1) * 4 : 0;
    }
    if (category === 'pikku suora') {
      const sortedDice = [...dice].sort((a, b) => a - b);
      const isSmallStraight = sortedDice.every((value, index) => value === index + 1);
      return isSmallStraight ? 15 : 0;
    }
    if (category === 'iso suora') {
      const sortedDice = [...dice].sort((a, b) => a - b);
      const isLargeStraight = sortedDice.every((value, index) => value === index + 2);
      return isLargeStraight ? 20 : 0;
    }
    if (category === 'täyskäsi') {
      const counts = Array(6).fill(0);
      dice.forEach((value) => {
        counts[value - 1]++;
      });
    
      const hasThreeOfAKind = counts.some((count) => count === 3);
      const hasPair = counts.some((count) => count === 2);
    
      if (hasThreeOfAKind && hasPair) {
        const threeOfAKindValue = counts.findIndex((count) => count === 3) + 1;
        const pairValue = counts.findIndex((count) => count === 2) + 1;
        return threeOfAKindValue * 3 + pairValue * 2;
      } else {
        return 0;
      }
    }
    if (category === 'sattuma') {
      return dice.reduce((acc, value) => acc + value, 0);
    }
    if (category === 'yatzy') {
      const counts = Array(6).fill(0);
      dice.forEach((value) => {
        counts[value - 1]++;
      });
      return counts.some((count) => count === 5) ? 50 : 0;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <div className={`${styles.player} ${styles.player1}`}>
          <Player
            onDiceSelected={handleDiceSelected}
            playerNumber={1}
            isCurrentPlayer={currentPlayer === 1}
            onNextPlayer={onNextPlayer}
          />
        </div>
        <div className={`${styles.player} ${styles.player3}`}>
          <Player
            onDiceSelected={handleDiceSelected}
            playerNumber={3}
            isCurrentPlayer={currentPlayer === 3}
            onNextPlayer={onNextPlayer}
          />
        </div>
      </div>
      <ScoreTable scores={scores} updateScore={updateScore} />
      <div className={styles.row}>
        <div className={`${styles.player} ${styles.player2}`}>
          <Player
            onDiceSelected={handleDiceSelected}
            playerNumber={2}
            isCurrentPlayer={currentPlayer === 2}
            onNextPlayer={onNextPlayer}
          />
        </div>
        <div className={`${styles.player} ${styles.player4}`}>
          <Player
            onDiceSelected={handleDiceSelected}
            playerNumber={4}
            isCurrentPlayer={currentPlayer === 4}
            onNextPlayer={onNextPlayer}
          />
        </div>
      </div>
    </div>
  );
};

export default PlayerLayout;
