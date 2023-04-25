import React, { useState, useEffect } from 'react';
import styles from '../HighScores.module.css';

const HighScores = () => {
  const [highScores, setHighScores] = useState([]);

  useEffect(() => {
    const storedHighScores = JSON.parse(localStorage.getItem('yatzyHighScores'));
    if (storedHighScores) {
      setHighScores(storedHighScores);
    }
  }, []);

  const renderHighScores = () => {
    return highScores.map((score, index) => (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{score.name}</td>
        <td>{score.score}</td>
      </tr>
    ));
  };

  return (
    <div className={styles.highScores}>
      <h2>Highscores</h2>
      <table className={styles.highScoresTable}>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>{renderHighScores()}</tbody>
      </table>
    </div>
  );
};

export default HighScores;
