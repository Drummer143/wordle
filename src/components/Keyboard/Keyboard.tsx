import { Props } from '../../types';
import { ReactComponent as ArrowLeft } from '../../assets/leftArrow.svg';

import styles from './Keyboard.module.css';

type Letter = {
    value: string,
    status: string
}

function Keyboard(props: Props) {
    const firstRowLetters = [{ value: 'Й', status: '' }, { value: 'Ц', status: '' }, { value: 'У', status: '' }, { value: 'К', status: '' }, { value: 'Е', status: '' }, { value: 'Н', status: '' }, { value: 'Г', status: '' }, { value: 'Ш', status: '' }, { value: 'Щ', status: '' }, { value: 'З', status: '' }, { value: 'Х', status: '' }, { value: 'Ъ', status: '' }];
    const secondRowLetters = [{ value: 'Ф', status: '' }, { value: 'Ы', status: '' }, { value: 'В', status: '' }, { value: 'А', status: '' }, { value: 'П', status: '' }, { value: 'Р', status: '' }, { value: 'О', status: '' }, { value: 'Л', status: '' }, { value: 'Д', status: '' }, { value: 'Ж', status: '' }, { value: 'Э', status: '' }];
    const thirdRowLetters = [{ value: 'Я', status: '' }, { value: 'Ч', status: '' }, { value: 'С', status: '' }, { value: 'М', status: '' }, { value: 'И', status: '' }, { value: 'Т', status: '' }, { value: 'Ь', status: '' }, { value: 'Б', status: '' }, { value: 'Ю', status: '' }];

    const keyStatuses = {
        notInTheWord: 'notInTheWord',
        anotherPlace: 'anotherPlace',
        right: 'right'
    }

    let word = '';

    const handleClick = (letter: Letter) => {
        if (word.length < 5) {
            word += letter.value;
            console.log(word);
        } else {
            console.log('full');
        }
    }

    const handleDelete = () => {
        if (word.length > 1) {
            word.slice(0, -1);
            console.log('delete');
        } else {
            console.log('empty');
        }
    }

    const handleSubmit = () => {
        if (word.length === 5) {
            console.log('submit', word);
            word = '';
        }
    }

    const firstRowKeys = firstRowLetters.map(letter => <button key={letter.value} onClick={() => handleClick(letter)} className={styles.key + ' ' + letter.status}>{letter.value}</button>);
    const secondRowKeys = secondRowLetters.map(letter => <button key={letter.value} onClick={() => handleClick(letter)} className={styles.key + ' ' + letter.status}>{letter.value}</button>);
    const thirdRowKeys = thirdRowLetters.map(letter => <button key={letter.value} onClick={() => handleClick(letter)} className={styles.key + ' ' + letter.status}>{letter.value}</button>);

    return (
        <div className={styles.wrapper}>
            <div className={styles.keyboardLine}>{firstRowKeys}</div>
            <div className={styles.keyboardLine}>{secondRowKeys}</div>
            <div className={styles.keyboardLine}>
                <button onClick={handleDelete} className={styles.backspace}>←{/* <ArrowLeft /> */}</button>
                {thirdRowKeys}
                <button onClick={handleSubmit} className={styles.backspace}>←{/* <ArrowLeft /> */}</button>
            </div>
        </div>
    );
}

export default Keyboard;