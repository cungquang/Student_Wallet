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
        _id: "", uid: "1234", title: "372Asn", done: false, subject: "CMPT 372",

        dueDate: new Date().toISOString().slice(0, 10), tag: "#Urgent", memo: "Blah Blah"
    };

    const AssignmentIP ="146.148.71.124"

    const [allAsn, setAllAsn] = useState<Array<asnData>>([]);
    const [isAdding, setAdding] = useState(false);
    const [checked, setChecked] = useState(false);
    const [editingAsn, setEditingAsn] = useState<asnData | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [filtered, setFiltered] = useState<Array<asnData>>([]);
    const [isEmpty, setEmpty] = useState(false);
    const [sortBy, setSortBy] = useState<string>('Name');
    const [showMemo, setShowMemo] = useState<string | null>(null); 
    const [filteredAsn, setFilteredAsn] = useState<Array<asnData>>([]);
    const [showDoneAsn, setShowDoneAsn] = useState(false);

    const handleChangeSearchTerm = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const updateList = async () => {
        const uid = localStorage.getItem('uid');
        const response = await axios.get(`http://${AssignmentIP}:3002/assignments/users/${uid}`);
        if(response.data.result.length<1){
            setEmpty(true);
        }
        else{
            setEmpty(false);
        }
        setAllAsn(response.data.result);
    };
    
    useEffect(() => {    
    updateList();
        setFiltered(allAsn)
        
    }, []); 

    useEffect(() => {
        const filteredList = filtered.filter(item => {
            if(searchTerm!==""){
            return item.title.toLowerCase().includes(searchTerm.toLowerCase());
        }
        else{
            return item.title
        }
        });
        setAllAsn(filteredList);
    }, [searchTerm]); 
    

    useEffect(() => {
        setFilteredAsn(allAsn.filter(item => !item.done));
    }, [allAsn]);

    const renderDoneAsnList = () => {
        if (!showDoneAsn) return null;
    
        const handleRestore = async (id: string) => {
            try {
                const updatedAsn = allAsn.find(item => item._id === id);
                if (updatedAsn) {
                    updatedAsn.done = false;
                    await axios.put(`http://${AssignmentIP}:3002/assignments/update/${id}`, { item: updatedAsn });
                    updateList();
                }
            } catch (error: any) {
                console.error(`Failed to restore the assignment: ${error.message}`);
            }
        };
    
        return (
            <div className="done-list">
                <h2>Done Assignments</h2>
                {allAsn.filter(item => item.done).map((item, key) => (
                    <div key={key} className='asn-list-item'>
                        <span>{String(item.title)}</span>
                        <span>{item.dueDate}</span>
                        <span>{String(item.tag)}</span>
                        <button className="asn-list-btn" onClick={() => handleRestore(item._id)}>RESTORE</button>
                        <button className="asn-list-btn" onClick={() => handleDelete(item._id)}>DELETE</button>
                    </div>
                ))}
            </div>
        );
    };
    
    const handleDelete = async (id: String) => {
        if (window.confirm("Do you want to delete the assignment?")) {
            await axios.delete(`http://${AssignmentIP}:3002/assignments/delete/${id}`);
            updateList();
        }
    }

    const handleCheck = async (item: asnData) => {
        try {
        item.done = !item.done;
        setChecked(item.done)
        await axios.put(`http://${AssignmentIP}:3002/assignments/update/${item._id}`, { item:item });
        const response = await axios.get(`http://${AssignmentIP}:3002/assignments/users/${item.uid}`);
        setAllAsn(response.data.result);
        setChecked(!checked)
    } catch (error: any) {
        console.error(`Failed to check the assignment: ${error.message}`);
    }

    };
    const handleEdit = (item: asnData) => {
        setEditingAsn(item);
    };

    const handleToggleMemo = (itemId: string) => {
        setShowMemo(showMemo === itemId ? null : itemId); 
    };
    
    const handleSubmitEdit = async (editedAsn: asnData) => {
        try {
            await axios.put(`http://${AssignmentIP}:3002/assignments/update/${editedAsn._id}`, { item: editedAsn });
            const uid = localStorage.getItem('uid');
            const response = await axios.get(`http://${AssignmentIP}:3002/assignments/users/${uid}`);
            setAllAsn(response.data.result);
            setEditingAsn(null); 
        } catch (error: any) {
            console.error("Error editing assignment:", error.message);
        }
    };


    const sortAssignments = (criteria: string) => {
        let sortedList = [...allAsn];

        switch (criteria) {
            case 'Name':
                sortedList.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case 'Date':
                sortedList.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
                break;
            case 'Tag':
                sortedList.sort((a, b) => a.tag.localeCompare(b.tag));
                break;
            default:
                break;
        }

        setAllAsn(sortedList);
    };

    useEffect(() => {
        sortAssignments(sortBy);
    }, [sortBy]);


    const handleSubmitAdd = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const newAsnData: asnData = {
            _id: "1234",
            uid: "1234",
            title: formData.get("assignmentTitle") as string,
            done: false,
            subject: formData.get("subject") as string,
            dueDate: formData.get("dueDate") as string,
            tag: formData.get("tag") as string,
            memo: formData.get("memo") as string,
        };
        const uid = localStorage.getItem('uid');
        await axios.post(`http://${AssignmentIP}:3002/assignments/add/${uid}`, newAsnData);
        const response = await axios.get(`http://${AssignmentIP}:3002/assignments/users/${uid}`);
        setAllAsn(response.data.result);
        setAdding(false);
        updateList();
    }

    const renderEditForm = () => {
        if (!editingAsn) return null;

        return (
            <form className="asn-add-form" onSubmit={(e) => {
                e.preventDefault();
                handleSubmitEdit(editingAsn);
            }}>
                <h2>Edit Assignment</h2>
                <button type="button" name="closeButton" onClick={() => setEditingAsn(null)}>X</button>

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
    return (
        <div>
            <Header />
            <div className='content-wrapper'>
                <div className='header-wrapper'>
                    <h2>ASSIGNMENT TRACKER</h2>
                    <label>sort by...</label>
                    <select className='sort-by' value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                        <option value="Name">Name</option>
                        <option value="Date">Date</option>
                        <option value="Tag">Tag</option>
                    </select>
                    <form>
                        <input
                            type='text'
                            className="search-bar"
                            name="search"
                            placeholder='Search...'
                            value={searchTerm}
                            onChange={handleChangeSearchTerm}
                        ></input>
                    </form>
                </div>
                <div className="asn-body">

                    <div className='asn-list-item' style={{ border: "none", fontWeight: "bold", marginBottom: "20px" }}>
                        <span>Done?</span>
                        <span>Title</span>
                        <span>Due date</span>
                        <span>Tag</span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    
                    {isEmpty?<h3>You have no assignments left!</h3>:
                    <div>
                    {
                    filteredAsn.map((item: asnData, key) => (
                        <div key={key} className='asn-list-item'>
                            <input
                                type="checkbox"
                                checked={item.done}
                                onChange={() => handleCheck(item)}
                            />
                            <div className="asn-title">{String(item.title)}</div>
                            <div className="asn-date">{item.dueDate}</div>
                            <div className="asn-tag">#{String(item.tag)}</div>
                                <button className="asn-list-btn" onClick={() => handleEdit(item)}>EDIT</button>
                                <button  className="asn-list-btn" onClick={() => handleToggleMemo(item._id)}>MEMO</button>
                            <button className="asn-list-btn" onClick={() => handleDelete(item._id)}>X</button>
                                {showMemo === item._id && <div className='asn-memo'>{String(item.memo)}</div>} 
                        </div>
                    ))
                    }
                    </div>}
                    <button  className="asn-list-btn show-done"  onClick={() => setShowDoneAsn(!showDoneAsn)}>
                        {showDoneAsn ? "Hide Done Assignments" : "Show Done Assignments"}
                    </button>
                    {renderDoneAsnList()}
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

                <button className='asn-add-btn' onClick={() => setAdding(true)}>
                    +
                </button>
            </div>
            <Footer />
        </div>
    );
};

export default AssignmentPage;