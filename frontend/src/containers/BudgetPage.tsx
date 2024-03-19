import React, { ChangeEvent, useState } from 'react';
import '../assets/budget.css';
import FileUploadComponent from '../components/budget/FileUploadComponent';
import LineChartComponent from '../components/budget/LineChartComponent';
import EditTextBoxComponent from '../components/budget/EditableComponent';
import Header from '../components/common/header';
import Footer from '../components/common/footer';

const testStyle = { width: '50%', height: '20px' }
const testStyle2 = { width: '50%', height: '60px' }

const BudgetPage: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
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

    const handleIsVisible = (data:any) => {
        setIsVisible(data);
    }

    //useState -> filter by period: current week, current month, current Year

    //useState -> chartType

    //Using useState => update the filter

    //Collect data according to the state

    const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const data = [1, 2, 3, 5, 6, 8, 3, 1];

    //Get data from Azure AI Service (read form) -> store into local storage
    const handleAIReadReceipt = async() => {

        //Call API to get data

        //Store data into local storage

    }

    //Get data from finance service
    const handleUserModifyReceipt = async () => {
        // const dataToUpdate = JSON.stringify({
        //     "Ingredients": expandText(ingredients),
        //     "Direction": expandText(directions),
        //     "LastModified": new Date().toLocaleTimeString()
        // })
        
        //API request to get data from the AI service
        // const response = await callPutRequest(configs.addApi().addApiMethod("update").addQueryParams("RecipeName", displayKey).build(), dataToUpdate);
        // if(!response.ok){
        //     throw new Error('Unable to submit to server');
        // }

        //Go back to SavedRecipes
        setTotalCost("");
        setTotalTax("");
    }

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
                        <FileUploadComponent/> 
                    </div>
                    <div>
                        <hr style={{ width: '100%', margin: '10px 0' }} />
                    </div>
                    <div id='displayReceipt'>
                        <form style={{ width: '100%' }}>
                            <EditTextBoxComponent
                                isVisible={isVisible}
                                onChange={handleTotalCost}
                                textBoxId='TotalCost'
                                textBoxLabel="Total Cost"
                                textValue={totalCost}
                                styles={testStyle}
                            />
                            
                            <EditTextBoxComponent
                                isVisible={isVisible}
                                onChange={handleTotalTax}
                                textBoxId='TotalTax'
                                textBoxLabel="Total Tax"
                                textValue={totalTax}
                                styles={testStyle}
                            />

                            <EditTextBoxComponent
                                isVisible={isVisible}
                                onChange={handleListOfPurchasedItems}
                                textBoxId='ListPurchasedItem'
                                textBoxLabel="Purchased Items"
                                textValue={listOfItems}
                                styles={testStyle2}
                            />
                        </form>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default BudgetPage;