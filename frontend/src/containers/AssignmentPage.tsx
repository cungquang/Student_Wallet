import React, { useEffect, useState } from 'react';
import Header from '../components/common/header';
import Footer from '../components/common/footer';
import axios, { all } from 'axios';
import "./asnPage.css"
interface asnData {
    _id: string;
    uid: string;
    title: string;
    done: boolean;
    subject: string;
    dueDate: string;
    tag: string;
    memo: string;
}


const AssignmentPage: React.FC = () => {

    const sampleData: asnData = {
        _id:"", uid: "1234", title: "372Asn", done: false, subject: "CMPT 372",

        dueDate: new Date().toISOString().slice(0, 10),         tag: "#Urgent", memo: "Blah Blah"
    };

    const [allAsn, setAllAsn] = useState<Array<asnData>>([sampleData]);
    const [isAdding, setAdding] = useState(false);
    const [checked, setChecked] = useState(false);
    const [editingAsn, setEditingAsn] = useState<asnData | null>(null);

    const handleSearch = async () => {
            await axios.post("http://localhost:3003/assignments/add", sampleData);
    }

    const handleDelete = async(id: String)=>{
        if(window.confirm("Do you want to delete the assignment?")){
        await axios.delete(`http://localhost:3003/assignments/delete/${id}`);}
    }

    const handleCheck = async (item: asnData) => {
            item.done = !item.done;
            setChecked(item.done)
            await axios.put(`http://localhost:3003/assignments/update/${item._id}`, { item });
            setAllAsn((await axios.get("http://localhost:3003/assignments")).data.result)
            setChecked(!checked)
            
    };
    const handleEdit = (item: asnData) => {
        setEditingAsn(item);
    };
    
    const handleSubmitEdit = async (editedAsn: asnData) => {
        try {
            await axios.put(`http://localhost:3003/assignments/update/${editedAsn._id}`, { item: editedAsn });
            // Fetch updated assignment list
            const response = await axios.get("http://localhost:3003/assignments");
            setAllAsn(response.data.result);
            setEditingAsn(null); // Close edit form after successful edit
        } catch (error: any) {
            console.error("Error editing assignment:", error.message);
        }
    };

    const handleSubmitAdd = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const newAsnData: asnData = {
            _id: "", 
            uid: "1234", 
            title: formData.get("assignmentTitle") as string,
            done: false, 
            subject: formData.get("subject") as string,
            dueDate: formData.get("dueDate") as string,
            tag: formData.get("tag") as string,
            memo: formData.get("memo") as string,
        };
    
            await axios.post("http://localhost:3003/assignments/add", newAsnData);
        
            const response = await axios.get("http://localhost:3003/assignments");
            console.log(response.data.result)
            setAllAsn(response.data.result);
            setAdding(false); 
        }
    
    const renderEditForm = () => {
        if (!editingAsn) return null;
    
        return (
            <form className="asn-add-form" onSubmit={(e) => {
                e.preventDefault();
                handleSubmitEdit(editingAsn);
            }}>
                <h2>Edit Assignment</h2>
                <button type="button"  name="closeButton"  onClick={() => setEditingAsn(null)}>X</button>

                <label>Assignment Title</label>
                
                <input type="text" id="editAssignmentTitle" name="editAssignmentTitle" value={editingAsn.title} onChange={(e) => setEditingAsn({ ...editingAsn!, title: e.target.value })}></input>
                <label>Subject</label>
                <input type="text" id="editSubject" name="editSubject" value={editingAsn.subject} onChange={(e) => setEditingAsn({ ...editingAsn!, subject: e.target.value })}></input>
                <label>Due date</label>
                <input type="date" id="editDueDate" name="editDueDate" value={editingAsn.dueDate} onChange={(e) => setEditingAsn({ ...editingAsn!, dueDate: e.target.value })}></input>
                <label>Tag</label>
                <input type="text" id="editTag" name="editTag" value={editingAsn.tag} onChange={(e) => setEditingAsn({ ...editingAsn!, tag: e.target.value })}></input>
                <label>Add any memo...</label>
                <input type="text" id="editMemo" name="editMemo" value={editingAsn.memo} onChange={(e) => setEditingAsn({ ...editingAsn!, memo: e.target.value })}></input>
                <button type="submit">Save</button>
            </form>
        );
    };
    useEffect(() => {
        const updateList = async () => {
            setAllAsn((await axios.get("http://localhost:3003/assignments")).data.result)
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
                                <input
                                type="checkbox"
                                checked={checked}
                                onChange={(e) => handleCheck(item)}
                            />                                
                            <div>{String(item.title)}</div>
                                <div>{item.dueDate}</div>
                                <div>{String(item.tag)}</div>
                                <button onClick={() =>handleEdit(item)}>EDIT</button>
                                <button>MEMO</button>
                                <button type="button" onClick={()=>handleDelete(item._id)}>X</button>
                                <div className='asn-memo'>{String(item.memo)}</div>
                            </div>
                        ))
                    }
                </div>
                {isAdding ?                
    <form className="asn-add-form" name="asn-add-form" onSubmit={handleSubmitAdd}>
        <h2>Add a new assignment!</h2>
        <button type="button" name="closeButton" onClick={() => setAdding(false)}>X</button>
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
    : null}

                {renderEditForm()}

                <button className='asn-add-btn' onClick={()=>setAdding(true)}>
                    +
                </button>
            </div>
            <Footer />
        </div>
    );
};

export default AssignmentPage;