import { useEffect } from 'react';
import styles from './WordsLayout.module.css';

type Props = {
  word: string
  countOfTries: number
  setCount: (prev: number) => void
}

function WordsLayout(props: Props) {
  useEffect(() => {
    if (props.countOfTries < 6) {
      props.setCount(props.countOfTries + 1);
      console.log('in words layout', props.countOfTries);
    }
  }, [props.word])

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.heading}>Wordle</h1>
      <div className={styles.wordsList}>
        <div className={styles.word}>
          <span className={`${styles.letter} ${styles.notInTheWord}`}>W</span>
          <span className={`${styles.letter} ${styles.anotherPlace}`}>O</span>
          <span className={`${styles.letter} ${styles.right}`}>R</span>
          <span className={`${styles.letter} ${styles.notInTheWord}`}>D</span>
          <span className={`${styles.letter} ${styles.anotherPlace}`}>L</span>
        </div>
      </div>
    </div>
  );
}

export default WordsLayout;
