'use client'

import React, { useState } from 'react'
import { MoreCta } from '../../cta/more';
import dynamic from 'next/dynamic'

const NewCollectionDrawer = dynamic(() => import('../../collections/new-collection'), {
    loading: () => null,
    ssr: false
})

interface Props {
    defaultValues: {
        id: string
        name: string
        path: string
    }
}

const MoreOption: React.FC<Props> = ({ defaultValues }) => {
    const [isDrawerOpen, setDrawer] = useState(false);

    const handleClick = () => {
        setDrawer(true)
    }

    return (
        <>
            <MoreCta onClick={handleClick} />
            {isDrawerOpen && <NewCollectionDrawer isOpen={isDrawerOpen} setOpen={setDrawer} defaultValues={defaultValues} canEdit canDelete />}
        </>

    )
}

export { MoreOption }