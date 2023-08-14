import React from 'react'

interface Props {
    canEdit?: boolean,
    canDelete?: boolean,
    onDeleteClick?: () => void
    onSaveClick?: () => void
}

const Actions: React.FC<Props> = ({ canEdit, canDelete, onSaveClick, onDeleteClick }) => {
    return (
        <>
            <div className='btn-group'>
                <button type="submit" form="endpoint-form" className='btn btn-primary'>{canEdit ? 'Update' : 'Create'}</button>
                {canDelete && <button className='btn btn-danger' onClick={onDeleteClick}>Delete</button>}
            </div>
        </>
    )
}

export { Actions }