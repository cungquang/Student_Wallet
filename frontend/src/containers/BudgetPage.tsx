import '../assets/budget.css';
import React, { ChangeEvent, useState } from 'react';
import FileUploadComponent from '../components/budget/FileUploadComponent';
import DisplayGraphComponent from '../components/budget/DisplayGraphComponent';
import EditableReceiptComponent from '../components/budget/EditableReceiptComponent';
import Header from '../components/common/header';
import Footer from '../components/common/footer';


const BudgetPage: React.FC = () => {
    const [uploadStatus, setUploadStatus] = useState<string>('');
    const [byUser, setByUser] = useState("");
    const [objectName, setObjectName] = useState("");
    const [byDate, setByDate] = useState("");
    const [byMerchant, setByMerchant] = useState("");
    const [totalCost, setTotalCost] = useState("");
    const [totalTax, setTotalTax] = useState("");
    const [listOfItems, setListOfItems] = useState("");

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

    return (
        <div>
            <Header/>
            <div className="BudgetPage">
                <div className="BudgetDashboard">
                    <div><h3>Dashboard</h3></div>
                    <DisplayGraphComponent 
                        byUser={byUser}
                        containerClassName='button-graph-container'
                    />
                </div>
                <div className="BudgetDivider"></div>
                <div className="BudgetUpload">
                    <div id='uploadReceipt'>
                        <h3>Upload File</h3>
                        <FileUploadComponent 
                            uploadStatus={uploadStatus} 
                            setUploadStatus={setUploadStatus}
                            setByUser={setByUser}
                            setObjectName={setObjectName}
                            setByDate={setByDate}
                            setByMerchant={setByMerchant}
                            setTotalCost={setTotalCost}
                            setTotalTax={setTotalTax}
                            setListOfItems={setListOfItems}
                        /> 
                    </div>
                    <div>
                        <hr style={{ width: '100%', margin: '10px 0' }} />
                    </div>
                    <div id='displayReceipt'>
                        <EditableReceiptComponent 
                            objectName={objectName}
                            byUser={byUser}
                            byDate={byDate}
                            byMerchant={byMerchant}
                            totalCost={totalCost}
                            totalTax={totalTax}
                            listOfItems={listOfItems}
                            setByUser={setByUser}
                            setByDate={setByDate}
                            setByMerchant={setByMerchant}
                            setTotalCost={setTotalCost}
                            setTotalTax={setTotalTax}
                            setListOfItems={setListOfItems}
                            setUploadStatus={setUploadStatus}
                            handleTransactionDate={handleTransactionDate} 
                            handleMerchantName={handleMerchantName}
                            handleTotalCost={handleTotalCost}
                            handleTotalTax={handleTotalTax}
                            handleListOfPurchasedItems={handleListOfPurchasedItems}
                        />
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default BudgetPage;