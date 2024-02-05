import React, { useState } from 'react';
import styled from 'styled-components';
import Study from './Study';
import LoginView from './LoginView';

interface BoxProps {   
    width: number;
    height: number;
}

const BoxStyle = styled.div<BoxProps>`
    width: ${(props) => props.width}px;
    height: ${(props) => props.height}px;
    margin: auto;
    border-radius: 10px;
    background-color: white;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

const LoginWrapper = styled.div`
    width: 50%;
    height: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const StudyWrapper = styled.div`
    width: 50%;
    height: 80%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const LoginBox: React.FC<BoxProps> = ({ width, height }) => {
    return (
        <div>
            <BoxStyle width={width} height={height}>
                <LoginWrapper> 
                    <LoginView />
                </LoginWrapper>      
                <StudyWrapper>
                    <Study width={400} height={467} />
                </StudyWrapper>    
            </BoxStyle>
        </div>
    );
};

export default LoginBox;
