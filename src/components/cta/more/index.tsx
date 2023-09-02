import React from 'react'
import Image from 'next/image'
import { DropDown } from '../../dropdown';
import type { DropDownActions } from '@/types';

interface Props {
    actions: Array<DropDownActions>
}

const MoreCta: React.FC<Props> = ({ actions }) => {
    return (
        <DropDown
            buttonChildren={(
                <button className="btn btn-icon">
                    <Image src="/icons/more.svg" alt="..." width="26" height="26" />
                </button>)}
            actions={actions}
        />
    )
}

export { MoreCta }