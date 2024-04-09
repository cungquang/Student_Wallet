import React, { useState } from 'react';
import Header from '../components/common/header';
import Footer from '../components/common/footer';
import styled from 'styled-components';
import axios from 'axios';
import RecJobs from '../components/resume/RecJobs';
import ResumeImage from '../components/resume/ResumeImage';
import ResumeHistory from '../components/resume/ResumeHistory';

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-bottom: 30px;
    border: 5px solid #D6F9EC;
    border-radius: 10px;
`;

const LeftWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 50%;
`;

const RightWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 50%;
`;


const ResumeResultPage: React.FC = () => {
    const ResumeIP ="35.238.55.71";
    const [assessId, setResumeId] = useState<string | null>(null);

    const handleFileNameChange = (newAssessId: string | null) => {
        setResumeId(newAssessId);
    };

    return (
        <div>
            <Header />
            <h1>Resume Assessment Page</h1>
            <Wrapper>
                <LeftWrapper>
                    <h3>Resume</h3>
                    <ResumeImage assessId={assessId} ResumeIP={ResumeIP} />
                </LeftWrapper>
                <RightWrapper>
                    <RecJobs assessId={assessId} ResumeIP={ResumeIP} />
                    <ResumeHistory onItemSelect={handleFileNameChange} ResumeIP={ResumeIP} />
                </RightWrapper>
            </Wrapper>               
            <Footer />
        </div>
    );
};

export default ResumeResultPage;