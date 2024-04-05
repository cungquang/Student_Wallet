import React, { useState } from 'react';
import Header from '../components/common/header';
import Footer from '../components/common/footer';
import styled from 'styled-components';
import axios from 'axios';
import JobTitles from '../components/resume/JobTitles';
import ResumeImage from '../components/resume/ResumeImage';
import ResumeHistory from '../components/resume/ResumeHistory';

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-bottom: 30px;
    border: 1px solid black;
`;

const LeftWrapper = styled.div`
    display: flex;
    justify-content: center;
    border: 1px solid green;
    width: 50%;
`;

const RightWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid blue;
    width: 50%;
`;


const ResumeResultPage: React.FC = () => {

    return (
        <div>
            <Header />
            <h1>Resume Result Page</h1>
            <Wrapper>
                <LeftWrapper>
                    <ResumeImage />
                </LeftWrapper>
                <RightWrapper>
                    <JobTitles />
                    <ResumeHistory />
                </RightWrapper>
            </Wrapper>               
            <Footer />
        </div>
    );
};

export default ResumeResultPage;