import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import { recordTypes } from '../../../constants'

interface Props<T> {
    field: T
    defaultValue:any
}

type Options = Array<{ value: string, label: string }>

const SelectRecordType = <T extends { name: string, ref: (i: any) => void, value: string, onChange: (e: Event) => void }>({ field, defaultValue }: Props<T>) => {
    const [options, setOptions] = useState([])

    useEffect(() => {
        let cList: Options = []
        recordTypes.forEach((c) => {
            const item = {
                value: c.ext,
                label: c.name
            }
            cList.push(item)
        })
        setOptions(cList)
    }, [])

    return (
        <Select
            classNames={{control: (state) => 'react-select-controller'}}
            placeholder='type'
            defaultValue={defaultValue}
            name={field.name}
            classNamePrefix="addl-class"
            options={options}
            value={options.find((c) => c?.value === field.value)}
            onChange={e => field.onChange(e.value)}
        />
    )
}

export { SelectRecordType }