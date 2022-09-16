import { useEffect, useState } from 'react';
import styles from './WordsLayout.module.css';

type Props = {
  currentWord: string
  countOfTries: number
  prevWords: string[]
}

function WordsLayout(props: Props) {
  useEffect(() => {
    if (props.countOfTries < 6) {
      console.log('in words layout', props.countOfTries);
    }
  }, [props.prevWords]);

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.heading}>Wordle</h1>
      <div className={styles.wordsList}>
        <div className={styles.word}>
          {props.currentWord.split('').map(letter => <span key={props.countOfTries + letter} className={`${styles.letter}`}>{letter}</span>)}
        </div>
      </div>
    </div>
  );
}

export default WordsLayout;
