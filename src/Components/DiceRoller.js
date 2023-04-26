import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import styles from '../DiceRoller.module.css';

const DiceRoller = forwardRef(({ onDiceSelected, isCurrentPlayer, onNextPlayer }, ref) => {
  const [diceRolls, setDiceRolls] = useState(Array(5).fill(null));
  const [locked, setLocked] = useState(Array(5).fill(false));
  const [rerollsRemaining, setRerollsRemaining] = useState(2);
  const [sum, setSum] = useState(0);

  const rollDice = () => {
    if (isCurrentPlayer && rerollsRemaining > 0) {
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
    if (isCurrentPlayer) {
      setLocked((prevLocked) => {
        const newLocked = [...prevLocked];
        newLocked[index] = !newLocked[index];
        return newLocked;
      });
    }
  };

  const diceEmoji = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];

  useEffect(() => {
    onDiceSelected(diceRolls.filter((_, index) => locked[index]));
  }, [locked]);

  useImperativeHandle(ref, () => ({
    resetRerolls: () => setRerollsRemaining(2),
  }));

  const handleNextPlayer = () => {
    onNextPlayer();
    setLocked(Array(5).fill(false));
    setRerollsRemaining(2);
  };

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
      {isCurrentPlayer && (
        <button onClick={handleNextPlayer}>Valmis</button>
      )}
    </div>
  );
});

export default DiceRoller;




