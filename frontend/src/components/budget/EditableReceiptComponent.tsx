import React, { ChangeEvent, useState } from 'react';
import EditTextBoxComponent from './EditableComponent';
import axios from 'axios';

const UPLOAD_SERVICE_IP = process.env.UPLOAD_SERVICE_API_IP || '34.130.132.234';

const FINANCE_SERVICE_URL = `http://${UPLOAD_SERVICE_IP}/api/finance/insertReceiptRecord`;

//Style
const BoxStyle = { width: '65%', height: '20px' };
const ListStyle = { width: '65%', height: '180px' };

interface EditableReceiptComponentsProps {
    objectName: string;
    byUser: string;
    byDate: string;
    byMerchant: string;
    totalCost: string;
    totalTax: string;
    listOfItems: string;
    setByUser: React.Dispatch<React.SetStateAction<string>>;
    setByDate: React.Dispatch<React.SetStateAction<string>>;
    setByMerchant: React.Dispatch<React.SetStateAction<string>>;
    setTotalCost: React.Dispatch<React.SetStateAction<string>>;
    setTotalTax: React.Dispatch<React.SetStateAction<string>>;
    setListOfItems: React.Dispatch<React.SetStateAction<string>>;
    setUploadStatus: (value: string) => void;
    handleTransactionDate: (event: ChangeEvent<HTMLInputElement>) => void;
    handleMerchantName: (event: ChangeEvent<HTMLInputElement>) => void;
    handleTotalCost: (event: ChangeEvent<HTMLInputElement>) => void;
    handleTotalTax: (event: ChangeEvent<HTMLInputElement>) => void;
    handleListOfPurchasedItems: (event: ChangeEvent<HTMLInputElement>) => void;
};

const EditableReceiptComponent: React.FC<EditableReceiptComponentsProps> = ({ objectName, byUser, byDate, byMerchant, totalCost, totalTax, listOfItems,
    setByUser, setByDate, setByMerchant, setTotalCost, setTotalTax, setListOfItems, setUploadStatus,
    handleTransactionDate, handleMerchantName, handleTotalCost, handleTotalTax, handleListOfPurchasedItems }) => {
    const [updateStatus, setUpdateStatus] = useState("");

    const handleUpdate: React.FormEventHandler<HTMLFormElement> = async (event) => {  
        try {
            event.preventDefault();
            //Write record
            const record = {
                userId: byUser,
                objectName: objectName,
                createdDate: byDate,
                lastModified: byDate,
                merchantName: byMerchant,
                totalCost: totalCost,
                totalTax: totalTax,
                receiptLine: JSON.parse(listOfItems)
            };

            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            console.log(FINANCE_SERVICE_URL);
            //Insert record to database
            const res_update = await axios.post(FINANCE_SERVICE_URL, record, config);
            if (res_update.status === 200) {
                setUploadStatus('');

                // Reset form fields
                setByUser('');
                setByDate('');
                setByMerchant('');
                setTotalCost('');
                setTotalTax('');
                setListOfItems('');
            } else {
                setUpdateStatus("ERROR: Failed to update record.");
            }
            
        } catch (error) {
            console.error("Error updating record:", error);
            setUpdateStatus("ERROR: An unexpected error occurred, please contact admin.");
        }
    };

    return(
        <div>
            <form onSubmit={handleUpdate} style={{ width: '100%' }}>
                <br/>
                <EditTextBoxComponent
                    onChange={handleTransactionDate}
                    textBoxId='TransactionDate'
                    textBoxLabel="Date"
                    textValue={byDate}
                    styles={BoxStyle}
                />

                <EditTextBoxComponent
                    onChange={handleMerchantName}
                    textBoxId='Merchant'
                    textBoxLabel="Merchant"
                    textValue={byMerchant}
                    styles={BoxStyle}
                />

                <EditTextBoxComponent
                    onChange={handleTotalCost}
                    textBoxId='Cost'
                    textBoxLabel="Cost"
                    textValue={totalCost}
                    styles={BoxStyle}
                />
                
                <EditTextBoxComponent
                    onChange={handleTotalTax}
                    textBoxId='Tax'
                    textBoxLabel="Tax"
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

                <div>
                    <button id='recordUploadSubmit' type='submit'>Submit</button>
                </div>
                <div>
                    {updateStatus && <span>{updateStatus}</span>}
                </div>
            </form>
        </div>
    )
};

export default EditableReceiptComponent;