import React, { useState } from 'react'
import CheckBoxGroup from '../../components/checkbox/CheckBoxGroup'

export const CheckboxPage = () => {

    let options = [
        { value: 1, label: "Option 1" },
        { value: 2, label: "Option 2" },
        { value: 3, label: "Option 3" }
    ]

    //let selectedValues = [2,3]

    const [selectedValues, setSelectedValues] = useState([2, 3])

    return (
        <div>
            <div className="grid">
                <div className='col'>
                    <CheckBoxGroup
                        selectedValues={selectedValues}
                        setSelectedValues={setSelectedValues}
                        flexCol={true}
                        options={options}
                    />
                    <span>
                        Seleccionados: {selectedValues}
                    </span>
                </div>

            </div>
        </div>
    )
}
