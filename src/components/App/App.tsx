import { useState } from 'react';
import Keyboard from '../Keyboard/Keyboard';
import WordsLayout from '../WordsLayout/WordsLayout';

import styles from './App.module.css';

function App() {
  let rightWord = 'жизнь';
  const [ word, setWord ] = useState('');
  const [ countOfTries, setCount ] = useState(0);

  return (
    <div className={styles.wrapper}>
      <WordsLayout word={word} countOfTries={countOfTries} setCount={setCount} />
      <Keyboard rightWord={rightWord} word={word} setWord={setWord} countOfTries={countOfTries} />
    </div>
  );
}

export default App;