import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import profile from '../../resources/profile.png';

const HeaderWrapper = styled.footer`
    width: 100%;
    height: 130px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-color: #D6F9EC;
`;

const NameWrapper = styled.div`
    width: 70%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const AppName = styled.button`
    width: 30%;
    height: 50%;
    font-size: 50px;
    font-family: Inika;
    border: none;
    background-color: transparent;
    cursor: pointer;
`;

const SideWrapper = styled.div`
    width: 15%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Logo = styled.img`
    width: 100px;
    height: 100px;
    background-color: #D9D9D9;
    border: none;
`;

const Profile = styled.button`
    width: 80px;
    height: 80px;
    background: url(${profile}) center/cover no-repeat;
    border: none;
    border-radius: 20px;
    cursor: pointer;
`;

const Header: React.FC = () => {
    const navigate = useNavigate();

    const handleAppNameClick = () => {
        navigate('/selection');
    };

    return (
        <div>
            <HeaderWrapper>
                <SideWrapper>
                    <Logo /> 
                </SideWrapper>
                <NameWrapper>
                    <AppName onClick={handleAppNameClick}>UniKeep</AppName>
                </NameWrapper>
                <SideWrapper>
                    <Profile />
                </SideWrapper>
            </HeaderWrapper>
        </div>
    );
};

export default Header;