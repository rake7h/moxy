import React from 'react'
import S from './styles.module.css';

interface Props {
    message: string
}
const LabelError: React.FC<Props> = ({ message }) => {
    return (
        <p className={S.message}>
            {message}
        </p>
    )
}

export { LabelError }