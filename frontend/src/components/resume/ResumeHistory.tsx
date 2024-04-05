import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const ResumeHistory: React.FC = () =>{
    const [resumeData, setResumeData] = useState<any[]>([]);
    const uid = "1234";
    // const uid = localStorage.getItem('uid');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/resumes/user/${uid}`);
                setResumeData(response.data.result);
            } catch (error) {
                console.error('Error fetching resume data:', error);
            }
        };

        fetchData();
    }, [uid]);

    return (
        <div>
            <ul>
                {resumeData.map((resumeItem) => (
                    <li key={resumeItem._id}>
                        <p>File Name: {resumeItem.fileName}</p>
                        <p>Jobs: {resumeItem.jobs}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ResumeHistory;
