import React, { ChangeEvent, useState } from 'react';
import EditTextBoxComponent from './EditableComponent';

//Style
const BoxStyle = { width: '50%', height: '20px' };
const ListStyle = { width: '50%', height: '60px' };

interface EditableReceiptComponentsProps {
    toEnable: boolean;
};

const EditableReceiptComponent: React.FC<EditableReceiptComponentsProps> = ({ toEnable }) => {

    const [totalCost, setTotalCost] = useState("");
    const [totalTax, setTotalTax] = useState("");
    const [listOfItems, setListOfItems] = useState("");

    //Get data from frontend
    const handleTotalCost = (event: ChangeEvent<HTMLInputElement>) => {
        setTotalCost(event.target.value);
    };

    const handleTotalTax = (event: ChangeEvent<HTMLInputElement>) => {
        setTotalTax(event.target.value);
    }

    const handleListOfPurchasedItems = (event: ChangeEvent<HTMLInputElement>) => {
        setListOfItems(event.target.value);
    }

    return(
        <div>
            {toEnable && (
                <form style={{ width: '100%' }}>
                    <EditTextBoxComponent
                        onChange={handleTotalCost}
                        textBoxId='TotalCost'
                        textBoxLabel="Total Cost"
                        textValue={totalCost}
                        styles={BoxStyle}
                    />
                    
                    <EditTextBoxComponent
                        onChange={handleTotalTax}
                        textBoxId='TotalTax'
                        textBoxLabel="Total Tax"
                        textValue={totalTax}
                        styles={BoxStyle}
                    />

                    <EditTextBoxComponent
                        onChange={handleListOfPurchasedItems}
                        textBoxId='ListPurchasedItem'
                        textBoxLabel="Purchased Items"
                        textValue={listOfItems}
                        styles={ListStyle}
                    />
                </form>
            )}
        </div>
    )
};

export default EditableReceiptComponent;