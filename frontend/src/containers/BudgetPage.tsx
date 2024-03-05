import React from 'react';
import '../assets/budget.css';
import FileUploadComponent from '../components/budget/FileUploadComponent';
import Header from '../components/common/header';
import Footer from '../components/common/footer';


const BudgetPage: React.FC = () => {
    return (
        <div>
            <Header/>
            <div className="BudgetPage">
                <div className="BudgetDashboard">
                    <span>Dashboard</span>
                </div>
                <div className="BudgetDivider"></div>
                <div className="BudgetUpload">
                    <FileUploadComponent/>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default BudgetPage;