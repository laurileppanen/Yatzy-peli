import React, { useState, useEffect } from 'react';
import styles from '../DiceRoller.module.css';

const DiceRoller = ({ onDiceSelected }) => {
  const [diceRolls, setDiceRolls] = useState(Array(6).fill(null));
  const [locked, setLocked] = useState(Array(6).fill(false));
  const [rerollsRemaining, setRerollsRemaining] = useState(2);
  const [sum, setSum] = useState(0);

  const rollDice = () => {
    if (rerollsRemaining > 0) {
      const rolls = diceRolls.map((roll, index) =>
        locked[index] ? roll : Math.floor(Math.random() * 6) + 1
      );
      setDiceRolls(rolls);
      setLocked(Array(6).fill(false));
      setRerollsRemaining(rerollsRemaining - 1);
      setSum(rolls.reduce((acc, value) => acc + value, 0));
    }
  };

  const toggleLock = (index) => {
    setLocked((prevLocked) => {
      const newLocked = [...prevLocked];
      newLocked[index] = !newLocked[index];
      return newLocked;
    });
  };

  const diceEmoji = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];

  useEffect(() => {
    onDiceSelected(diceRolls.filter((_, index) => locked[index]));
  }, [locked, onDiceSelected, diceRolls]);

  return (
    <div>
      <button onClick={rollDice}>Heitä noppaa</button>
      <div>
        {diceRolls.map((roll, index) => (
          <span
            key={index}
            className={styles.diceEmoji}
            onClick={() => toggleLock(index)}
            style={{ textDecoration: locked[index] ? 'line-through' : 'none' }}
          >
            {roll && (
              <span>
                {diceEmoji[roll - 1]}
              </span>
            )}
          </span>
        ))}
      </div>
      <div>Heittoja jäljellä: {rerollsRemaining}</div>
      <div>Noppien summa: {sum}</div>
    </div>
  );
};

export default DiceRoller;

