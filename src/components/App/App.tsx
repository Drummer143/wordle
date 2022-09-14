import Keyboard from '../Keyboard/Keyboard';
import WordsLayout from '../WordsLayout/WordsLayout';

import styles from './App.module.css';

function App() {
  const word = 'жизнь';

  return (
    <div className={styles.wrapper}>
      <WordsLayout word={word} />
      <Keyboard word={word} />
    </div>
  );
}

export default App;