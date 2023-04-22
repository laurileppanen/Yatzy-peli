import React, { useRef } from 'react';
import DiceRoller from './DiceRoller';
import styles from '../Player.module.css';

const Player = ({ playerNumber, onDiceSelected, isCurrentPlayer, onNextPlayer }) => {
  const diceRollerRef = useRef();

  const resetRerolls = () => {
    if (isCurrentPlayer) {
      diceRollerRef.current.resetRerolls();
    }
  };

  return (
    <div className={styles.playerContainer}>
      <h2 className={styles.playerName}>Pelaaja {playerNumber}</h2>
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








