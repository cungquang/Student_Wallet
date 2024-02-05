import React from 'react';
import Header from '../components/common/header';
import Footer from '../components/common/footer';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import budget from '../resources/budget.png';
import assignment from '../resources/assignment.png';
import resume from '../resources/resume.png';

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
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: border 0.3s;
    &:hover {
        border: 5px solid #D6F9EC;
    }
`;

const BudgetImg = styled.div`
    width: 100%;
    height: 400px;
    background: url(${budget}) center/cover no-repeat;
    border-radius: 20px;
    z-index: -1;
    cursor: pointer;
`;

const AssignmentImg = styled.div`
    width: 100%;
    height: 400px;
    background: url(${assignment}) center/cover no-repeat;
    border-radius: 20px;
    z-index: -1;
    cursor: pointer;
`;

const ResumeImg = styled.div`
    width: 100%;
    height: 400px;
    background: url(${resume}) center/cover no-repeat;
    border-radius: 20px;
    z-index: -1;
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
                <Options onClick={() => SwitchPage('/budget')}>
                    <div style={{fontSize: '35px', fontFamily: 'Inika'}}>Manage your budget</div>
                    <BudgetImg></BudgetImg>
                </Options> 
                <Options onClick={() => SwitchPage('/assignment')}>
                    <div style={{fontSize: '35px', fontFamily: 'Inika'}}>Track your assignments</div>
                    <AssignmentImg></AssignmentImg>
                </Options> 
                <Options onClick={() => SwitchPage('/resume')}>
                    <div style={{fontSize: '35px', fontFamily: 'Inika'}}>Assess your resume</div>
                    <ResumeImg></ResumeImg>
                </Options> 
            </SelectWrapper>
            <Footer />
        </div>
    );
};

export default SelectionPage;
