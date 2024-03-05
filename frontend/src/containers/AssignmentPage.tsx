import React, { useEffect, useState } from 'react';
import Header from '../components/common/header';
import Footer from '../components/common/footer';
import axios, { all } from 'axios';
import "./asnPage.css"
interface asnData {
    _id: String;
    uid: String;
    title: String;
    done: Boolean;
    subject: String;
    dueDate: String;
    tag: String;
    memo: String;
}

const AssignmentPage: React.FC = () => {

    const sampleData: asnData = {
        _id:"", uid: "1234", title: "372Asn", done: false, subject: "CMPT 372",
        dueDate: String(new Date().toLocaleDateString("en-US", { month: 'short', day: 'numeric' })),
         tag: "#Urgent", memo: "Blah Blah"
    };

    const [allAsn, setAllAsn] = useState<Array<asnData>>([sampleData]);
    const [isAdding, setAdding] = useState(false);

    const handleSearch = async () => {
            await axios.post("http://localhost:9999/assignments/add", sampleData);
    }

    const handleDelete = async(id: String)=>{
        await axios.delete(`http://localhost:9999/assignments/delete/${id}`);
    }

    useEffect(() => {
        const updateList = async () => {
            setAllAsn((await axios.get("http://localhost:9999/assignments")).data.result)
        }
        updateList();
    })
    return (
        <div>
            <Header />
            <div className='content-wrapper'>
                <div className='header-wrapper'>
                    <h2>ASSIGNMENT TRACKER</h2>
                    <label>sort by...</label>
                    <select className='sort-by'>
                        <option>Name</option>
                        <option>Date</option>
                        <option>Tag</option>
                    </select>
                    <form>
                        <input type='text' className="search-bar" name="search" placeholder='Search...'></input>
                        <button onClick={handleSearch}>GO</button>
                    </form>
                </div>
                <div className="asn-body">
                    
                <div className='asn-list-item' style={{border:"none", fontWeight: "bold", marginBottom: "20px"}}>
                    <span>Done?</span>
                    <span>Title</span>
                    <span>Due date</span>
                    <span>Tag</span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                    {
                        allAsn.map((item: asnData, key) => (
                            <div key={key} className='asn-list-item'>
                                <input type="checkbox"></input>
                                <div>{String(item.title)}</div>
                                <div>{item.dueDate}</div>
                                <div>{String(item.tag)}</div>
                                <button>EDIT</button>
                                <button>MEMO</button>
                                <button type="button" onClick={()=>handleDelete(item._id)}>X</button>
                                <div className='asn-memo'>{String(item.memo)}</div>
                            </div>
                        ))
                    }
                </div>
                {isAdding?                
                <form className="asn-add-form" name="asn-add-form">
                    <h2>Add a new assignment!</h2>
                    <button type="button" name="closeButton" onClick={()=>setAdding(false)}>X</button>
                    <label>Assignment Title</label>
                    <input type="text" id="assignmentTitle" name="assignmentTitle" placeholder='Title'></input>
                    <label>Subject</label>
                    <input type="text" id="subject" name="subject" placeholder='Subject'></input>
                    <label >Due date</label>
                    <input type="date" id="dueDate" name="dueDate"></input>
                    <label>Tag</label>
                    <input type="text" id="tag" name="tag" placeholder='Tag'></input>
                    <label >Add any memo...</label>
                    <input type="text" id="memo" name="memo" placeholder='Memo'></input>
                    <button type="submit" name="submitButton">Add</button>
                </form>
                :<></>}


                <button className='asn-add-btn' onClick={()=>setAdding(true)}>
                    +
                </button>
            </div>
            <Footer />
        </div>
    );
};

export default AssignmentPage;