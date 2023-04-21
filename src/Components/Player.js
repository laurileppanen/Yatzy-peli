import React from 'react';
import DiceRoller from './DiceRoller';
import styles from '../Player.module.css';

const Player = ({ playerNumber, onDiceSelected, isCurrentPlayer, onNextPlayer }) => {
  return (
    <div className={styles.playerContainer}>
      <h2 className={styles.playerName}>Pelaaja {playerNumber}</h2>
      <DiceRoller
        onDiceSelected={(dice) => onDiceSelected(playerNumber, dice)}
        isCurrentPlayer={isCurrentPlayer}
        onNextPlayer={onNextPlayer}
      />
    </div>
  );
};

export default Player;






