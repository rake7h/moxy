import React from 'react'

interface Props {
    canEdit?: boolean,
    canDelete?: boolean,
    onDeleteClick?: () => void
    onSaveClick?: () => void
    editError?: boolean
}

const Actions: React.FC<Props> = ({ canEdit, canDelete, onSaveClick, onDeleteClick, editError }) => {
    return (
        <>
            <div className='btn-group'>
                <button type="submit" form="collection-form" className='btn btn-primary' disabled={editError}>{canEdit ? 'Update' : 'Create'}</button>
                {canDelete && <button className='btn btn-danger' onClick={onDeleteClick}>Delete</button>}
            </div>
        </>
    )
}

export { Actions }