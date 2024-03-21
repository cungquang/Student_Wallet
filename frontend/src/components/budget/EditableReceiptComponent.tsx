import React, { ChangeEvent, useEffect, useState, useRef } from 'react';
import EditTextBoxComponent from './EditableComponent';

//Style
const BoxStyle = { width: '50%', height: '20px' };
const ListStyle = { width: '50%', height: '180px' };

interface EditableReceiptComponentsProps {
    toEnable: boolean;
};


function combineItems(data: Record<string, any>, prefix = 'item', maxItems = Infinity) {
    const items = [];

    for (let i = 0; i < maxItems; i++) {
        const propertyName = `${prefix}${i}`;
        if (propertyName in data) {
            const item = JSON.parse(data[propertyName]);
            items.push(item);
        } else {
            break;
        }
    }

    return JSON.stringify(items);
}


const EditableReceiptComponent: React.FC<EditableReceiptComponentsProps> = ({ toEnable }) => {
    const [byUser, setByUser] = useState("");
    const [byDate, setByDate] = useState("");
    const [byMerchant, setByMerchant] = useState("");
    const [totalCost, setTotalCost] = useState("");
    const [totalTax, setTotalTax] = useState("");
    const [listOfItems, setListOfItems] = useState("");
    const newReceiptRef = useRef<any>(null);

    //File has been uploaded & read - useEffect prevent re-render
    useEffect(() => {
        if (toEnable) {
            const recentReceiptJSON = localStorage.getItem('recent_receipt');
            if (recentReceiptJSON !== null) {
                const newReceipt = JSON.parse(recentReceiptJSON);

                //Fix data
                newReceiptRef.current = newReceipt; 
                const receiptData = newReceipt.receiptData; 
                
                //Set data
                setByUser(newReceipt.userId);
                
                if (receiptData) {
                    const newList = combineItems(receiptData);
                    
                    setByDate(receiptData.TransactionDate);
                    setByMerchant(receiptData.MerchantName);
                    setTotalCost(receiptData.Total);
                    setTotalTax(receiptData.Tax);
                    setListOfItems(newList);
                }
            }
        }
    }, [toEnable]);

    //Get data from frontend
    const handleTransactionDate = (event: ChangeEvent<HTMLInputElement>) => {
        setByDate(event.target.value);
    };

    const handleMerchantName = (event: ChangeEvent<HTMLInputElement>) => {
        setByMerchant(event.target.value);
    };

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
                    <div>User: {byUser}</div>
                    <br/>
                    <EditTextBoxComponent
                        onChange={handleTransactionDate}
                        textBoxId='TransactionDate'
                        textBoxLabel="Transaction Date"
                        textValue={byDate}
                        styles={BoxStyle}
                    />

                    <EditTextBoxComponent
                        onChange={handleMerchantName}
                        textBoxId='MerchantName'
                        textBoxLabel="Merchant Name"
                        textValue={byMerchant}
                        styles={BoxStyle}
                    />

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