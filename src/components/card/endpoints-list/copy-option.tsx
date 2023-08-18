'use client'

import React, { useState } from 'react'
import { CopyCta } from '../../cta/copy';

interface Props {
    defaultValues: {
        id: string
        endpoint: string
        moxy: string
        targetUrl: string
        collectionId: string
    }
}

const CopyOption: React.FC<Props> = ({ defaultValues }) => {

    const handleClick = () => {
        navigator.clipboard.writeText(process.env.APP_HOST + defaultValues.endpoint)
    }

    return (
        <>
            <CopyCta onClick={handleClick} />
        </>

    )
}

export { CopyOption }