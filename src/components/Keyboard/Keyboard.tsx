import styles from './Keyboard.module.css';
import keys from './keys.json';

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
    const firstRowLetters = ['й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ'];
    const secondRowLetters = ['ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э'];
    const thirdRowLetters = ['backspace', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', 'enter'];

    const createButton = (value: string) => {
        const keyCode = keys.find(key => key.values.ru === value)?.keyCode;

        if (keyCode) {
            switch (value) {
                case 'backspace': {
                    return <button key={value} id={`${keyCode}`} onClick={props.handleDelete} className={`${styles.key} ${styles.controls}`} disabled={props.disabled}>←</button>
                }
                case 'enter': {
                    return <button key={value} id={`${keyCode}`} onClick={props.handleSubmit} className={`${styles.key} ${styles.controls}`} disabled={props.disabled}>→</button>
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

                    return <button key={value} id={`${keyCode}`} onClick={() => props.handleClick(value)} className={`${styles.key} ${styles[status] || ''}`} disabled={props.disabled}>{value.toUpperCase()}</button>
                }
            }
        }
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (!props.disabled) {
            // if (e.key >= 'А' && e.key <= 'я') {
            //     props.handleClick(e.key);
            // } else if (e.key === 'Backspace') {
            //     props.handleDelete();
            // } else if (e.key === 'Enter') {
            //     props.handleSubmit();
            // }

            const key = document.getElementById(`${e.keyCode}`);

            key?.classList.add(styles.active);
            setTimeout(() => key?.classList.remove(styles.active), 50);
            key?.click();
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