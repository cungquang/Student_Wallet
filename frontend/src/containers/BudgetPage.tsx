import React, { useState } from 'react';
import '../assets/budget.css';
import FileUploadComponent from '../components/budget/FileUploadComponent';
import LineChartComponent from '../components/budget/LineChartComponent';
import EditableReceiptComponent from '../components/budget/EditableReceiptComponent';
import Header from '../components/common/header';
import Footer from '../components/common/footer';

const BudgetPage: React.FC = () => {
    const [toEnable, setToEnable] = useState(false);

    //useState -> filter by period: current week, current month, current Year

    //useState -> chartType

    //Using useState => update the filter

    //Collect data according to the state

    const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const data = [1, 2, 3, 5, 6, 8, 3, 1];

    return (
        <div>
            <Header/>
            <div className="BudgetPage">
                <div className="BudgetDashboard">
                    <div><h3>Dashboard</h3></div>
                    <LineChartComponent labels={labels} InputData={data}/>
                </div>
                <div className="BudgetDivider"></div>
                <div className="BudgetUpload">
                    <div id='uploadReceipt'>
                        <h3>Upload File</h3>
                        <FileUploadComponent setToEnable={setToEnable}/> 
                    </div>
                    <div>
                        <hr style={{ width: '100%', margin: '10px 0' }} />
                    </div>
                    <div id='displayReceipt'>
                        <EditableReceiptComponent toEnable={toEnable} />
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default BudgetPage;