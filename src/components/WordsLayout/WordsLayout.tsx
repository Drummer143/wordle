import React, { useEffect, useState } from 'react';
import styles from './WordsLayout.module.css';

type Props = {
  currentWord: string
  countOfTries: number
  prevWords: string[]
  rightWord: string
}

function WordsLayout(props: Props) {
  const [prevWordsNodes, setPrevWordsNodes] = useState<JSX.Element[]>([]);

  // selecting status for letter
  const selectStatus = (letter: string, pos: number) => {
    let status = '';

    const newWord = props.prevWords[props.countOfTries - 1];

    if (props.rightWord.includes(letter.toLowerCase())) {
      if (newWord[pos].toLowerCase() === props.rightWord[pos]) {
        status = 'right'
      } else {
        status = 'anotherPlace'
      }
    } else {
      status = 'notInTheWord'
    }

    return status;
  }

  // add new word with fixed letter statuses
  useEffect(() => {
    if (props.countOfTries > 0) {
      const newWord = (
        <div key={props.countOfTries} className={styles.word}>
          {props.prevWords[props.prevWords.length - 1].split('').map((letter, i) => <span key={props.countOfTries + i + letter} className={`${styles.letter} ${styles[selectStatus(letter, i)]}`}>{letter}</span>)}
        </div>
      );

      setPrevWordsNodes(prev => [...prev, newWord]);
    }
  }, [props.prevWords]);

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.heading}>Wordle</h1>
      <div className={styles.wordsList}>
        {prevWordsNodes.length !== 0 && [prevWordsNodes]}
        <div className={styles.word}>
          {props.currentWord.split('').map((letter, i) => <span key={props.countOfTries + 1 + i + letter} className={`${styles.letter}`}>{letter}</span>)}
        </div>
      </div>
    </div>
  );
}

export default WordsLayout;
