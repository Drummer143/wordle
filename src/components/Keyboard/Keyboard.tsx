import styles from './Keyboard.module.css';

type Props = {
    usedLetters: {
        excludedLetters: string
        wrongPositionLetters: string
        rightLetters: string
    }
    handleClick: (letter: string) => void
    handleDelete: () => void
    handleSubmit: () => void

    disabled?: boolean
}

function Keyboard(props: Props) {
    const firstRowLetters = ['Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ'];
    const secondRowLetters = ['Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Э'];
    const thirdRowLetters = ['backspace', 'Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю', 'enter'];

    const createButton = (value: string) => {
        switch (value) {
            case 'backspace': {
                return <button key={value} onClick={props.handleDelete} className={`${styles.key} ${styles.controls}`} disabled={props.disabled}>←</button>
            }
            case 'enter': {
                return <button key={value} onClick={props.handleSubmit} className={`${styles.key} ${styles.controls}`} disabled={props.disabled}>→</button>
            }
            default: {
                let status = '';
                if (props.usedLetters.excludedLetters.includes(value)) {
                    status = 'notInTheWord';
                } else if (props.usedLetters.rightLetters.includes(value)) {
                    status = 'right';
                } else if (props.usedLetters.wrongPositionLetters.includes(value)) {
                    status = 'anotherPlace';
                }

                return <button key={value} onClick={() => props.handleClick(value)} className={`${styles.key} ${styles[status] || ''}`} disabled={props.disabled}>{value}</button>
            }
        }
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (!props.disabled) {
            if (e.key >= 'А' && e.key <= 'я') {
                props.handleClick(e.key);
            } else if (e.key === 'Backspace') {
                props.handleDelete();
            } else if (e.key === 'Enter') {
                props.handleSubmit();
            }
        }
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.keyboardLine}>{firstRowLetters.map(letter => createButton(letter))}</div>
            <div className={styles.keyboardLine}>{secondRowLetters.map(letter => createButton(letter))}</div>
            <div className={styles.keyboardLine}>{thirdRowLetters.map(letter => createButton(letter))}</div>
            <input type="text" onKeyUp={handleKeyPress} style={{ pointerEvents: 'none', opacity: 0 }} onBlur={e => e.target.focus()} autoFocus />
        </div>
    );
}

export default Keyboard;