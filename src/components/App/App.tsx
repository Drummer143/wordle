import { useState } from 'react';
import Keyboard from '../Keyboard/Keyboard';
import WordsLayout from '../WordsLayout/WordsLayout';

import styles from './App.module.css';

function App() {
  let rightWord = 'жизнь';
  const [currentWord, setCurrentWord] = useState('');
  const [countOfTries, setCountOfTries] = useState(0);
  const [previousWords, setPreviousWords] = useState<string[]>([]);

  const [excludedLetters, setExcludedLettes] = useState('');
  const [wrongPositionLetters, setWrongPositionLetters] = useState('');
  const [rightLetters, setRightLetters] = useState('');

  const handleClick = (letter: string) => {
    if (currentWord.length < 5) {
      setCurrentWord(prev => prev + letter);
    }
  }

  const handleDelete = () => {
    if (currentWord.length > 0) {
      setCurrentWord(prev => prev.slice(0, -1))
    }
  }

  const handleSubmit = () => {
    if (currentWord.length === 5) {
      for (let i = 0; i < currentWord.length; i++) {
        if (!rightWord.includes(currentWord[i].toLowerCase())) {
          setExcludedLettes(prev => prev + currentWord[i]);
        } else if (rightWord[i] === currentWord[i].toLowerCase()) {
          setRightLetters(prev => prev + currentWord[i]);
        } else if (!rightLetters.includes(currentWord[i])) {
          setWrongPositionLetters(prev => prev + currentWord[i]);
        }
      }

      setCountOfTries(prev => prev + 1);
      setPreviousWords(prev => [...prev, currentWord]);
      setCurrentWord('');
    }
  }

  return (
    <div className={styles.wrapper}>
      <WordsLayout currentWord={currentWord} rightWord={rightWord} countOfTries={countOfTries} previousWords={previousWords} />
      <Keyboard usedLetters={{ excludedLetters, wrongPositionLetters, rightLetters }} handleClick={handleClick} handleDelete={handleDelete} handleSubmit={handleSubmit} disabled={countOfTries < 6 ? false : true} />
    </div>
  );
}

export default App;