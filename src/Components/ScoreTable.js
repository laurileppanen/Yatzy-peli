import React from 'react';
import styles from '../ScoreTable.module.css';

const ScoreTable = ({ scores, updateScore, playerNames }) => {
  const categories = [
    'ykköset', 'kakkoset', 'kolmoset', 'neloset', 'viitoset', 'kuutoset', 'pari', 'kaksi paria', 'kolme samaa', 'neljä samaa', 'pikku suora', 'iso suora', 'täyskäsi', 'sattuma', 'yatzy'
  ];

  const handleCategoryClick = (playerNumber, category) => {
    updateScore(playerNumber, category);
  };

  const calculateTotalScore = (playerNumber) => {
    return categories.reduce((sum, category) => {
      const score = scores[playerNumber][category] || 0;
      return sum + score;
    }, 0);
  };

  const saveHighScore = (playerNumber, playerName) => {
    const totalScore = calculateTotalScore(playerNumber);
    const newHighScore = { name: playerName, score: totalScore };
    const storedHighScores = JSON.parse(localStorage.getItem('yatzyHighScores')) || [];
    const updatedHighScores = [...storedHighScores, newHighScore].sort((a, b) => b.score - a.score).slice(0, 10);
    localStorage.setItem('yatzyHighScores', JSON.stringify(updatedHighScores));
  };

  return (
    <table className={styles.scoreTable}>
      <thead>
        <tr>
          <th></th>
          <th>{playerNames[1]}</th>
          <th>{playerNames[2]}</th>
          <th>{playerNames[3]}</th>
          <th>{playerNames[4]}</th>
        </tr>
      </thead>
      <tbody>
        {categories.map((category) => (
          <tr key={category}>
            <td>{category}</td>
            <td>
              <button onClick={() => handleCategoryClick(1, category)}>
                {scores[1][category] || ''}
              </button>
            </td>
            <td>
              <button onClick={() => handleCategoryClick(2, category)}>
                {scores[2][category] || ''}
              </button>
            </td>
            <td>
              <button onClick={() => handleCategoryClick(3, category)}>
                {scores[3][category] || ''}
              </button>
            </td>
            <td>
              <button onClick={() => handleCategoryClick(4, category)}>
                {scores[4][category] || ''}
              </button>
            </td>
          </tr>
        ))}
        <tr>
          <td>Summa</td>
          <td>
  {calculateTotalScore(1)}
  <button onClick={() => saveHighScore(1, playerNames[1])}>Tallenna ennätys</button>
</td>
<td>
  {calculateTotalScore(2)}
  <button onClick={() => saveHighScore(2, playerNames[2])}>Tallenna ennätys</button>
</td>
<td>
  {calculateTotalScore(3)}
  <button onClick={() => saveHighScore(3, playerNames[3])}>Tallenna ennätys</button>
</td>
<td>
  {calculateTotalScore(4)}
  <button onClick={() => saveHighScore(4, playerNames[4])}>Tallenna ennätys</button>
</td>
        </tr>
      </tbody>
    </table>
  );
};

export default ScoreTable;