import React from 'react';
import Header from '../components/common/header';
import Footer from '../components/common/footer';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const SelectWrapper = styled.div`
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-bottom: 60px;
`;

const Options = styled.button`
    width: 400px;
    height: 500px;
    border-radius: 20px;
    border: 5px solid #B0B0B0;
    background: transparent;
    margin: 0 40px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`;

const SelectionPage: React.FC = () => {
    const navigate = useNavigate();

    const SwitchPage = (path: string) => {
        navigate(path);
    };

    return (
        <div>
            <Header />
            <h1 style={{margin:"50px 0 50px 0" }}>What would you like to do?</h1>
            <SelectWrapper >
                <Options onClick={() => SwitchPage('/budget')}>Manage your budget</Options> 
                <Options onClick={() => SwitchPage('/assignment')}>Track your assignments</Options> 
                <Options onClick={() => SwitchPage('/resume')}>Assess your resume</Options> 
            </SelectWrapper>
            <Footer />
        </div>
    );
};

export default SelectionPage;
