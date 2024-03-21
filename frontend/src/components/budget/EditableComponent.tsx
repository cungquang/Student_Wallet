import React from 'react';

type EditTextBoxProps = {
    onChange: any
    textBoxId: string;
    textBoxLabel: string;
    textValue: string;
    styles: any;
}

const EditTextBoxComponent: React.FC<EditTextBoxProps> = ({ onChange, textBoxId, textBoxLabel, textValue, styles }) => {
    // useState -> keep track of current state => if the state on textValue => change => re-render entire UI
    return (
        <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '10px' }}>
            <label htmlFor={"textarea_" + textBoxId} style={{ width: '100px', marginRight: '10px' }}>{textBoxLabel}</label>
            <textarea
                id={"textarea_" + textBoxId}
                value={textValue}
                onChange={onChange}
                style={styles}
            />
        </div>
    );
}

export default EditTextBoxComponent;
