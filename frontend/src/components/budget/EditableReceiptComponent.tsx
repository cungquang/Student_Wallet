import React, { ChangeEvent, useEffect, useState, useRef } from 'react';
import EditTextBoxComponent from './EditableComponent';
import axios from 'axios';
import { error } from 'console';

const UPLOAD_SERVICE_IP = process.env.UPLOAD_SERVICE_API_IP || '34.130.132.234';

const FINANCE_SERVICE_URL = `http://${UPLOAD_SERVICE_IP}/api/finance/insertReceiptRecord`;

//Style
const BoxStyle = { width: '65%', height: '20px' };
const ListStyle = { width: '65%', height: '180px' };

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
    const [updateStatus, setUpdateStatus] = useState("");
    const [objectName, setObjectName] = useState("");
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
                setObjectName(newReceipt.objectName);
                
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
    };

    const handleListOfPurchasedItems = (event: ChangeEvent<HTMLInputElement>) => {
        setListOfItems(event.target.value);
    };

    const handleUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    
        try {
            const record = {
                userId: byUser,
                objectName: objectName,
                createdDate: byDate,
                lastModified: byDate,
                totalCost: totalCost,
                totalTax: totalTax,
                receiptLine: JSON.parse(listOfItems)
            };
    
            const res_update = await axios.post(FINANCE_SERVICE_URL, record);
    
            if (res_update.status === 200) {
                setUpdateStatus("Update successful!");
    
                // Reset form fields
                setByUser("");
                setByDate("");
                setByMerchant("");
                setTotalCost("");
                setTotalTax("");
                setListOfItems("");
            } else {
                throw error;
            }
        } catch (error) {
            console.error("Error updating record:", error);
            setUpdateStatus("ERROR: An unexpected error occurred, please contact admin.");
        }
    };

    return(
        <div>
            {toEnable && (
                <form onSubmit={handleUpdate} style={{ width: '100%' }}>
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

                    <div className='upload-button'>
                        <button type='submit'>Submit</button>
                    </div>
                    <div>
                        {updateStatus && <span>{updateStatus}</span>}
                    </div>
                </form>
            )}
        </div>
    )
};

export default EditableReceiptComponent;