import React from 'react';
import styles from '../ScoreTable.module.css';

const ScoreTable = ({ scores, updateScore }) => {
  const categories = [
    'ykköset', 'kakkoset', 'kolmoset', 'neloset', 'viitoset', 'kuutoset', 'pari', 'kaksi paria', 'kolme samaa', 'neljä samaa', 'pikku suora', 'iso suora', 'täyskäsi', 'sattuma', 'yatzy'
  ];

  const handleCategoryClick = (playerNumber, category) => {
    updateScore(playerNumber, category);
  };

  const calculateTotalScore = () => {
    const categories = [
      'ykköset',
      'kakkoset',
      'kolmoset',
      'neloset',
      'viitoset',
      'kuutoset',
      'pari',
      'kaksi paria',
      'kolme samaa',
      'neljä samaa',
      'pikku suora',
      'iso suora',
      'täyskäsi',
      'sattuma',
      'yatzy',
    ];
  
    return categories.reduce((sum, category) => {
      const score = scores[category] || 0;
      return sum + score;
    }, 0);
  };

  return (
    <table className={styles.scoreTable}>
      <thead>
        <tr>
          <th></th>
          <th>Pelaaja1</th>
          <th>Pelaaja2</th>
          <th>Pelaaja3</th>
          <th>Pelaaja4</th>
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
      </tbody>
      <tr>
  <td>Summa</td>
  <td>{calculateTotalScore()}</td>
</tr>
    </table>
  );
};

export default ScoreTable;




