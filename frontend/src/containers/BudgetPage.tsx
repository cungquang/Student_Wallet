import '../assets/budget.css';
import React, { ChangeEvent, useState } from 'react';
import axios from 'axios';
import FileUploadComponent from '../components/budget/FileUploadComponent';
import DisplayGraphComponent from '../components/budget/DisplayGraphComponent';
import EditableReceiptComponent from '../components/budget/EditableReceiptComponent';
import Header from '../components/common/header';
import Footer from '../components/common/footer';

const UPLOAD_SERVICE_IP = '34.130.95.15';

const weekLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const monthLabels = ['Week1', 'Week2', 'Week3', 'Week4'];
const { startOfWeek, endOfWeek } = getStartAndEndDateOfWeek();
const { startOfMonth, endOfMonth } = getStartAndEndDateOfMonth();
const costPerDayInWeek: number[] = new Array(7).fill(0);
const costPerWeekInMonth: number[] = new Array(4).fill(0);

interface receiptRecord {
    _id: string,
    userId: string,
    objectName: string,
    createdDate: string,
    lastModified: string,
    merchantName: string,
    totalCost: number,
    totalTax: number;
}

interface receiptExtracted {
    totalCost: number,
    createdDate: string
}

///////////////////////////// SUPPORT /////////////////////////////

//Function to fetch data
const fetchData = async (url: string, userId: string, startDate: string, endDate: string) => {
    try {
        const res_getData = await axios.get(url, {
            params: {
            userId: userId,
            startDate: startDate,
            endDate: endDate
            }
        });
        
        return res_getData.data;
    } catch (error) {
        console.error('ERROR: error occur while fetching data:', error);
    }
};

//Function to extract cost & date
function extractCostAndDate(data: receiptRecord[]): receiptExtracted[] {
    return data.map(obj => ({
        totalCost: obj.totalCost,
        createdDate: obj.createdDate
    }));
}


const BudgetPage: React.FC = () => {
    const GET_RECEIPT_URL = `http://${UPLOAD_SERVICE_IP}/api/finance/getReceiptRecordsByUserIdAndDate`;   
    const fixUserId = localStorage.getItem('uid') || 'alextestcom';

    const [uploadStatus, setUploadStatus] = useState<string>('');
    const [objectName, setObjectName] = useState('');
    const [byDate, setByDate] = useState('');
    const [byMerchant, setByMerchant] = useState('');
    const [totalCost, setTotalCost] = useState('');
    const [totalTax, setTotalTax] = useState('');
    const [listOfItems, setListOfItems] = useState('');
    const [scaleLabels, setScaleDataLabels] = useState<string[]>(weekLabels);
    const [displayStatus, setDisplayStatus] = useState<number>(0);
    const [displayData, setDisplayData] = useState<number[]>([]);

    const fetchWeekDataWhenReady = async () => {
        // Call the fetch Data function
        const res_weekData = await fetchData(GET_RECEIPT_URL, fixUserId, startOfWeek, endOfWeek);

        // Summarize data by date
        const receiptData = extractCostAndDate(res_weekData);
        receiptData.forEach((receipt) => {
            const date = new Date(receipt.createdDate);
            const dayOfWeek = date.getDay(); 
            costPerDayInWeek[dayOfWeek] += receipt.totalCost
        })
    };

    const fetchMonthDataWhenReady = async () => {
        // Call the fetch Data function
        const res_monthData = await fetchData(GET_RECEIPT_URL, fixUserId, startOfMonth, endOfMonth);

        // Summarize data by date
        const receiptData = extractCostAndDate(res_monthData);
        receiptData.forEach((receipt) => {
            const date = new Date(receipt.createdDate);
            const dayOfWeek = (date.getDate()%4) - 1;
            costPerWeekInMonth[dayOfWeek] += receipt.totalCost
        })
    };

    const fetchAllData = async() => {
        //Clear all old data
        costPerDayInWeek.fill(0);
        costPerWeekInMonth.fill(0);

        // Refresh weekly data
        await fetchWeekDataWhenReady();
        await fetchMonthDataWhenReady();
    }

    // Call fetchDataWhenReady directly inside the component
    // useEffect(() => {
    //     fetchAllData();
        
    //     setDisplayData(costPerDayInWeek);
    // }, []);

    //////////////////////////////////// Receipt ////////////////////////////////////

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

    //////////////////////////////////// Graph ////////////////////////////////////

    const handleWeekClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setDisplayStatus(0);
        setScaleDataLabels(weekLabels);
        setDisplayData(costPerDayInWeek);
    };

    const handleMonthClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setDisplayStatus(1);
        setScaleDataLabels(monthLabels);
        setDisplayData(costPerWeekInMonth);
    };

    
    const handleRefreshClick = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        await fetchAllData();

        //assign data - base on range
        if (displayStatus === 0) {
            setScaleDataLabels(weekLabels);
            setDisplayData(costPerDayInWeek);
        } else{
            setScaleDataLabels(monthLabels);
            setDisplayData(costPerWeekInMonth);
        }
    };

    return (
        <div>
            <Header/>
            <div className="BudgetPage">
                <div className="BudgetDashboard">
                    <div><h3>Dashboard</h3></div>
                    <DisplayGraphComponent 
                        scaleLabels={scaleLabels}
                        inputData={displayData}
                        containerClassName='button-graph-container'
                        handleWeekClick={handleWeekClick}
                        handleMonthClick={handleMonthClick}
                        handleRefreshClick={handleRefreshClick}
                    />
                </div>
                <div className="BudgetDivider"></div>
                <div className="BudgetUpload">
                    <div id='uploadReceipt'>
                        <h3>Upload File</h3>
                        <FileUploadComponent
                            ai_service_ip={UPLOAD_SERVICE_IP}
                            uploadStatus={uploadStatus} 
                            byUser={fixUserId}
                            setUploadStatus={setUploadStatus}
                            setObjectName={setObjectName}
                            setByDate={setByDate}
                            setByMerchant={setByMerchant}
                            setTotalCost={setTotalCost}
                            setTotalTax={setTotalTax}
                            setListOfItems={setListOfItems}
                        /> 
                        
                        It might take a few seconds for files to be read...
                    </div>
                    <div>
                        <hr style={{ width: '100%', margin: '10px 0' }} />
                    </div>
                    <div id='displayReceipt'>
                        <EditableReceiptComponent 
                            upload_service_ip={UPLOAD_SERVICE_IP}
                            objectName={objectName}
                            byUser={fixUserId}
                            byDate={byDate}
                            byMerchant={byMerchant}
                            totalCost={totalCost}
                            totalTax={totalTax}
                            listOfItems={listOfItems}
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



//Source: ChatGPT
function getStartAndEndDateOfWeek() {
    const today = new Date();
    const dayOfWeek = today.getDay(); 

    // Calculate the start date of the week (Sunday)
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - dayOfWeek);
    const formattedStartOfWeek = startOfWeek.toISOString().split('T')[0];

    // Calculate the end date of the week (Saturday)
    const endOfWeek = new Date(today);
    endOfWeek.setDate(today.getDate() + (6 - dayOfWeek));
    const formattedEndOfWeek = endOfWeek.toISOString().split('T')[0];

    return { startOfWeek: formattedStartOfWeek, endOfWeek: formattedEndOfWeek };
}

//Source: ChatGPT
function getStartAndEndDateOfMonth() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();

    // Calculate the start date of the month
    const startOfMonth = new Date(year, month, 1);
    const formattedStartDate = startOfMonth.toISOString().split('T')[0];

    // Calculate the end date of the month
    const endOfMonth = new Date(year, month + 1, 0);
    const formattedEndDate = endOfMonth.toISOString().split('T')[0];

    return { startOfMonth: formattedStartDate, endOfMonth: formattedEndDate };
}


export default BudgetPage;