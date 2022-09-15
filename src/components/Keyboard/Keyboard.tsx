import { useState } from 'react';

import styles from './Keyboard.module.css';

type Props = {
    word: string
    countOfTries: number
    rightWord: string
    setWord: (word: string) => void
}

function Keyboard(props: Props) {
    const [input, setInput] = useState('');
    const [excludedLetters, setExcludedLettes] = useState('');
    const [lettersInAnotherPlace, setLetter] = useState('');
    const [rightLetters, setRightLetters] = useState('');

    const handleClick = (letter: string) => {
        if (input.length < 5) {
            setInput(prev => prev + letter);
            console.log(input);
        } else {
            console.log('full');
        }
    }

    const handleDelete = () => {
        if (input.length > 1) {
            setInput(prev => prev.slice(0, -1))
            console.log('delete', input);
        } else {
            console.log('empty');
        }
    }

    const handleSubmit = () => {
        if (input.length === 5) {
            for (let i = 0; i < input.length; i++) {
                if (!props.rightWord.includes(input[i].toLowerCase())) {
                    setExcludedLettes(prev => prev + input[i]);
                } else if (props.rightWord[i] === input[i].toLowerCase()) {
                    setRightLetters(prev => prev + input[i]);
                } else {
                    setLetter(prev => prev + input[i]);
                }
            }

            console.log('submit', input);
            props.setWord(input);
            setInput('');
        }
    }

    const firstRowLetters = ['Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ'];
    const secondRowLetters = ['Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Э'];
    const thirdRowLetters = ['←', 'Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю', '→'];

    const createButton = (value: string) => {
        switch (value) {
            case '←': {
                return <button key={value} onClick={handleDelete} className={`${styles.key} ${styles.controls}`}>{value}</button>
            }
            case '→': {
                return <button key={value} onClick={handleSubmit} className={`${styles.key} ${styles.controls}`}>{value}</button>
            }
            default: {
                let status = '';
                if (excludedLetters.includes(value)) {
                    status = 'notInTheWord';
                } else if (rightLetters.includes(value)) {
                    status = 'right';
                } else if (lettersInAnotherPlace.includes(value)) {
                    status = 'anotherPlace';
                }

                return <button key={value} onClick={() => handleClick(value)} className={`${styles.key} ${styles[status] || ''}`}>{value}</button>
            }
        }
    }

    let firstRowKeys = firstRowLetters.map(letter => createButton(letter));
    let secondRowKeys = secondRowLetters.map(letter => createButton(letter));
    let thirdRowKeys = thirdRowLetters.map(letter => createButton(letter));

    return (
        <div className={styles.wrapper}>
            <div className={styles.keyboardLine}>{firstRowKeys}</div>
            <div className={styles.keyboardLine}>{secondRowKeys}</div>
            <div className={styles.keyboardLine}>{thirdRowKeys}</div>
        </div>
    );
}

export default Keyboard;