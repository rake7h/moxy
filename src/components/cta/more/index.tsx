import React from 'react'
import Image from 'next/image'

interface Props {
    onClick: () => void
}
const MoreCta: React.FC<Props> = ({ onClick }) => {
    return (
        <button className="btn"  onClick={onClick}>
            <Image src="/icons/edit.svg" alt="..." width="26" height="26" />
        </button>
    )
}

export { MoreCta }