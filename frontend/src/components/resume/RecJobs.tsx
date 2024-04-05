import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 30px;
`;

const FileName = styled.div`
    text-align: left;
`;

interface RecJobsProps {
    assessId: string | null;
}

const RecJobs: React.FC<RecJobsProps> = ({ assessId }) => {
    const [jobsData, setJobsData] = useState<string | null>(null);
    
    useEffect(() => {
        const fetchJobs = async () => {
            if (assessId) {
                try {
                    const ResumeIP = process.env.RESUME_SERVICE_IP || "localhost";
                    const response = await axios.get(`http://${ResumeIP}:3003/resumes/jobs/${assessId}`);
                    setJobsData(response.data.result);
                } catch (error) {
                    console.error('Error fetching jobs data:', error);
                }
            }
        };

        fetchJobs();
    }, [assessId]);

    const Jobs = jobsData ? jobsData.replace(/\n/g, '<br>') : 'Choose the assessment to view';

    return (
        <Wrapper>
            <h3>Recommended Jobs</h3>
            <FileName dangerouslySetInnerHTML={{ __html: Jobs }} />
        </Wrapper>
    );
};

export default RecJobs;