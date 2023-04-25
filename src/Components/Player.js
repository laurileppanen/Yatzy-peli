import React, { useRef } from 'react';
import DiceRoller from './DiceRoller';
import styles from '../Player.module.css';

const Player = ({
  playerNumber,
  playerName,
  onDiceSelected,
  isCurrentPlayer,
  onNextPlayer,
  updatePlayerName,
}) => {
  const diceRollerRef = useRef();

  const resetRerolls = () => {
    if (isCurrentPlayer) {
      diceRollerRef.current.resetRerolls();
    }
  };

  const handleNameChange = (event) => {
    updatePlayerName(playerNumber, event.target.value);
  };

  return (
    <div className={styles.playerContainer}>
      <input
        className={styles.playerName}
        value={playerName}
        onChange={handleNameChange}
      />
      <h2 className={styles.playerName}>{playerName} </h2>
      <DiceRoller
        ref={diceRollerRef}
        onDiceSelected={(dice) => onDiceSelected(playerNumber, dice)}
        isCurrentPlayer={isCurrentPlayer}
        onNextPlayer={onNextPlayer}
        resetRerolls={resetRerolls}
      />
    </div>
  );
};

export default Player;
