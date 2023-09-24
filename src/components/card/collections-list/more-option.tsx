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
        type: string
    }
}

const MoreOption: React.FC<Props> = ({ defaultValues }) => {
    const [isDrawerOpen, setDrawer] = useState(false);

    const actions = [
        {
            name: 'Edit',
            action: () => setDrawer(true)
        },
        {
            name: 'Open Url',
            action: () => {
                const url = `/api/collections/${defaultValues.name}`
                window.open(url, '_blank');
            }
        }
    ]

    return (
        <>
            <MoreCta actions={actions} />
            {isDrawerOpen && <NewCollectionDrawer isOpen={isDrawerOpen} setOpen={setDrawer} defaultValues={defaultValues} canEdit canDelete />}
        </>

    )
}

export { MoreOption }