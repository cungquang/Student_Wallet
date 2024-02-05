import React from 'react';
import LoginBox from '../components/LoginBox/LoginBox';
import styled from 'styled-components';
import study from '../resources/study.png';

const Background = styled.div`
    background-color: #D6F9EC;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const MainPage: React.FC = () => {
    return (
        <div>
            <Background>
                <LoginBox width={800} height={700} />
            </Background>
        </div>
    );
};

export default MainPage;
