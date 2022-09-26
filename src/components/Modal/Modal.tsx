import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import styles from './Modal.module.css';

type Props = {
    status: string
}

function Modal({ status }: Props) {
    const [modalContainer] = useState(document.createElement('div'));
    const [modalRoot] = useState(document.getElementById('modal'));

    useEffect((): (() => void) => {
        modalRoot?.appendChild(modalContainer);

        return () => modalRoot?.removeChild(modalContainer);
    })

    return ReactDOM.createPortal(
        (
            <div className={`${styles.wrapper} ${styles[status]}`}>

            </div>
        ),
        modalContainer
    )
}

export default Modal;