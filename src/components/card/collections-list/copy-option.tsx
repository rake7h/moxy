'use client'

import React, { useState } from 'react'
import { CopyCta } from '../../cta/copy';

interface Props {
    defaultValues: {
        id: string
        name: string
        path: string
    }
}

const CopyOption: React.FC<Props> = ({ defaultValues }) => {

    const handleClick = () => {
        navigator.clipboard.writeText(window.location.host+"/api/collections/" + defaultValues.name)
    }

    return (
        <>
            <CopyCta onClick={handleClick} />
        </>

    )
}

export { CopyOption }