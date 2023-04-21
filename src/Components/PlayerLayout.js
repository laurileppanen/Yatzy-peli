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
    // Add other categories' score calculation here
  };

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <div className={`${styles.player} ${styles.player1}`}>
          <Player onDiceSelected={handleDiceSelected} playerNumber={1} />
        </div>
        <div className={`${styles.player} ${styles.player3}`}>
          <Player onDiceSelected={handleDiceSelected} playerNumber={3} />
        </div>
      </div>
      <ScoreTable scores={scores} updateScore={updateScore} />
      <div className={styles.row}>
        <div className={`${styles.player} ${styles.player2}`}>
          <Player onDiceSelected={handleDiceSelected} playerNumber={2} />
        </div>
        <div className={`${styles.player} ${styles.player4}`}>
          <Player onDiceSelected={handleDiceSelected} playerNumber={4} />
        </div>
      </div>
    </div>
  );
};

export default PlayerLayout;




