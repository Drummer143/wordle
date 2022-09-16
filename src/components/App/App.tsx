import { useState } from 'react';
import Keyboard from '../Keyboard/Keyboard';
import WordsLayout from '../WordsLayout/WordsLayout';

import styles from './App.module.css';

function App() {
  let rightWord = 'жизнь';
  const [currentWord, setCurrentWord] = useState('');
  const [countOfTries, setCountOfTries] = useState(0);
  const [prevWords, setPrevWords] = useState<string[]>([]);

  const [excludedLetters, setExcludedLettes] = useState('');
  const [wrongPosLetters, setWrongPosLetters] = useState('');
  const [rightLetters, setRightLetters] = useState('');

  const handleClick = (letter: string) => {
      if (currentWord.length < 5) {
          setCurrentWord(prev => prev + letter);
          console.log(currentWord);
      } else {
          console.log('full');
      }
  }

  const handleDelete = () => {
      if (currentWord.length > 1) {
          setCurrentWord(prev => prev.slice(0, -1))
          console.log('delete', currentWord);
      } else {
          console.log('empty');
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
          setWrongPosLetters(prev => prev + currentWord[i]);
        }
      }

      console.log('submit', currentWord);
      setCountOfTries(prev => prev + 1);
      setPrevWords(prev => [...prev, currentWord]);
      setCurrentWord('');
    }
  }

  return (
    <div className={styles.wrapper}>
      <WordsLayout currentWord={currentWord} countOfTries={countOfTries} prevWords={prevWords} />
      <Keyboard usedLetters={{ excludedLetters, wrongPosLetters, rightLetters }} handleClick={handleClick} handleDelete={handleDelete} handleSubmit={handleSubmit} />
    </div>
  );
}

export default App;