import React from 'react';
import DiceRoller from './DiceRoller';
import styles from '../Player.module.css';

const Player = ({ playerNumber, onDiceSelected }) => {
  return (
    <div className={styles.playerContainer}>
      <h2 className={styles.playerName}>Pelaaja {playerNumber}</h2>
      <DiceRoller onDiceSelected={(dice) => onDiceSelected(playerNumber, dice)} />
    </div>
  );
};

export default Player;





