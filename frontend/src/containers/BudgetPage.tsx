import React from 'react';
import '../assets/budget.css';
import FileUploadComponent from '../components/budget/FileUploadComponent';
import LineChartComponent from '../components/budget/LineChartComponent';
import Header from '../components/common/header';
import Footer from '../components/common/footer';

const BudgetPage: React.FC = () => {
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
                    <div><h3>Upload File</h3></div>
                    <FileUploadComponent/>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default BudgetPage;