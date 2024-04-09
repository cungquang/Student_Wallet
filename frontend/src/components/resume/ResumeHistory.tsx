import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 30px;
`;

const ResumeButton = styled.button`
    width: 100%;
    border: none;
    padding: 10px;
    box-sizing: border-box;
    text-align: left;
    background-color: transparent;
    cursor: pointer;
    font-weight: bold;
    color: black;
    transition: background-color 0.3s;

    &:hover {
        background-color: #D6F9EC;
    }

    &.active {
        background-color: #D6F9EC;
    }
`;

const DeleteButton = styled.button`
    border: none;
    background-color: transparent;
    color: red;
    cursor: pointer;
    margin-left: 5px;

    &:hover {
        text-decoration: underline;
    }
`;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
`;

const TableHeader = styled.th`
    font-size: 15px;
    border: 1px solid #D7DBDD;
    padding: 8px;
    text-align: center;
`;

const TableCell = styled.td`
    border: 1px solid #D7DBDD;
    padding: 8px;
`;

interface HistoryProps {
    onItemSelect: (assessId: string | null) => void;
    ResumeIP: string;
}

const ResumeHistory: React.FC<HistoryProps> = ({ onItemSelect, ResumeIP }) =>{
    const [resumeData, setResumeData] = useState<any[]>([]);
    const [selectedItem, setSelectedItem] = useState<string | null>(null);
    const uid = localStorage.getItem('uid');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://${ResumeIP}/resumes/user/${uid}`);
                const formattedResumeData = response.data.result.map((resumeItem: any) => ({
                    ...resumeItem,
                    createdAt: new Date(resumeItem.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit'
                    }).replace(/\//g, '/')
                }));
                setResumeData(formattedResumeData);
            } catch (error) {
                console.error('Error fetching resume data:', error);
            }
        };

        fetchData();
    }, [uid]);

    const handleDeleteItem = async (assessid: string) => {
        try {
            await axios.delete(`http://${ResumeIP}:3003/resumes/delete/${assessid}`);
            setResumeData(resumeData.filter(item => item._id !== assessid));
            if (selectedItem === assessid) {
                setSelectedItem(null);
                onItemSelect(null);
            }
        } catch (error) {
            console.error('Error deleting resume:', error);
        }
    };

    const handleItemClick = (resumeItem: any) => {
        console.log(`Resume item clicked: ${resumeItem._id}`);
        setSelectedItem(resumeItem._id);
        onItemSelect(resumeItem._id);
    };

    return (
        <Wrapper>
            <h3>Assessment History</h3>
            <Table>
                <thead>
                    <tr>
                        <TableHeader>Date</TableHeader>
                        <TableHeader>File Name</TableHeader>
                        <TableHeader>Delete</TableHeader>
                    </tr>
                </thead>
                <tbody>
                    {resumeData.map((resumeItem) => (
                        <tr key={resumeItem._id}>
                            <TableCell style={{fontSize: "12px"}}>{resumeItem.createdAt}</TableCell>
                            <TableCell style={{fontSize: "12px"}}>
                                <ResumeButton
                                    className={selectedItem === resumeItem._id ? 'active' : ''}
                                    onClick={() => handleItemClick(resumeItem)}
                                >
                                    {resumeItem.fileName}
                                </ResumeButton>
                            </TableCell>
                            <TableCell style={{ textAlign: 'center' }}>
                                <DeleteButton onClick={() => handleDeleteItem(resumeItem._id)}>Delete</DeleteButton>
                            </TableCell>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Wrapper>
    );
};

export default ResumeHistory;