'use client'

import React, { useState } from 'react'
import { MoreCta } from '../../cta/more';
import dynamic from 'next/dynamic'

const EndpointDrawer = dynamic(() => import('../../endpoints/new-endpoint'), {
    loading: () => null,
    ssr: false
})

interface Props {
    defaultValues: {
        id: string
        endpoint: string
        moxy: string
        targetUrl: string
        collectionId: string
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
            {isDrawerOpen && <EndpointDrawer isOpen={isDrawerOpen} setOpen={setDrawer} defaultValues={defaultValues} canEdit canDelete />}
        </>

    )
}

export { MoreOption }