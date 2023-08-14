import React from 'react'
import S from './styles.module.css';
import Image from 'next/image'

interface Props {
    onClick: () => void
}
const MoreCta: React.FC<Props> = ({ onClick }) => {
    return (
        <button className="btn btn-icon" onClick={onClick}>
            <Image src="/icons/more.svg" alt="..." width="26" height="26" />
        </button>
    )
}

export { MoreCta }