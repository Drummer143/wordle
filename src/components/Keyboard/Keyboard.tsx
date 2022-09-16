import { useState } from 'react';

import styles from './Keyboard.module.css';

type Props = {
    usedLetters: {
        excludedLetters: string
        wrongPosLetters: string
        rightLetters: string
    }
    handleClick: (letter: string) => void
    handleDelete: () => void
    handleSubmit: () => void
}

function Keyboard(props: Props) {
    const firstRowLetters = ['Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ'];
    const secondRowLetters = ['Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Э'];
    const thirdRowLetters = ['←', 'Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю', '→'];

    const createButton = (value: string) => {
        switch (value) {
            case '←': {
                return <button key={value} onClick={props.handleDelete} className={`${styles.key} ${styles.controls}`}>{value}</button>
            }
            case '→': {
                return <button key={value} onClick={props.handleSubmit} className={`${styles.key} ${styles.controls}`}>{value}</button>
            }
            default: {
                let status = '';
                if (props.usedLetters.excludedLetters.includes(value)) {
                    status = 'notInTheWord';
                } else if (props.usedLetters.rightLetters.includes(value)) {
                    status = 'right';
                } else if (props.usedLetters.wrongPosLetters.includes(value)) {
                    status = 'anotherPlace';
                }

                return <button key={value} onClick={() => props.handleClick(value)} className={`${styles.key} ${styles[status] || ''}`}>{value}</button>
            }
        }
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.keyboardLine}>{ firstRowLetters.map(letter => createButton(letter)) }</div>
            <div className={styles.keyboardLine}>{ secondRowLetters.map(letter => createButton(letter)) }</div>
            <div className={styles.keyboardLine}>{ thirdRowLetters.map(letter => createButton(letter)) }</div>
        </div>
    );
}

export default Keyboard;