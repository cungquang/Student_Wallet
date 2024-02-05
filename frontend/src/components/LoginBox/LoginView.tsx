import React, { useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Heading = styled.div`
    font-size: 50px;
    font-family: Inika;
    margin-bottom: 20px;
`;

const TextField = styled.input`
    font-size: 20px;
    font-family: Inika;
    border: 1px solid #b0b0b0;
    width: 303px;
    height: 52px;
    border-radius: 10px;
    margin: 3px 0; 
    padding-left: 10px;
    box-sizing: border-box;
`;

const LoginButton = styled.button`
    width: 303px;
    height: 52px;
    border-radius: 10px;
    font-size: 20px;
    font-family: Inika;
    color: #949A99;
    background-color: #D6F9EC;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s;
    &:hover {
        background-color: #BCFFE7;
    }
`;

const InvalidText = styled.div<{ isVisible: boolean }>`
    font-size: 15px;
    font-family: Inika;
    color: red;
    margin: 2px 0 5px 0;
    visibility: ${(props) => (props.isVisible ? 'visible' : 'hidden')};
    opacity: ${(props) => (props.isVisible ? '1' : '0')};
    transition: visibility 0s, opacity 0.3s;
`;

const Line = styled.div`
    width: 303px;
    height: 1px;
    background-color: #b0b0b0;
    margin: 20px 0 5px 0;
`;

const ViewText = styled.span`
    font-size: 20px;
    font-family: Inika;
    color: black;
`;

const ViewButton = styled.button`
    font-size: 20px; 
    font-family: Inika;
    color: #949A99; 
    background-color: transparent;
    border: none;
    cursor: pointer;
    transition: color 0.3s;
    &:hover {
        color: black;
    }
`;

const ViewChange = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 30px;
`;

const LoginView: React.FC = () => {
    const [isIDValid, setIsIDValid] = useState(true);
    const [isLogin, setIsLogin] = useState(true);

    const [id, setId] = useState('');
    const [password, setPassword] = useState('');

    const toggleView = () => {
        if (isLogin) {
            setIsLogin((isLogin) => false);
        }
        else setIsLogin((isLogin) => true);
    };

    return (
        <div>
            <Wrapper>
                <Heading>UniKeep</Heading> 
                <TextField
                    type="text"
                    placeholder="ID"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                />
                <TextField
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <InvalidText isVisible={!isIDValid}>Invalid ID</InvalidText>
                <LoginButton>{isLogin ? 'Sign Up' : 'Log In'}</LoginButton>
                <div style={{ margin: '20px', fontSize: '20px', fontFamily: 'Inika' }}>OR</div>
                <LoginButton>
                    {isLogin ? 'Log In With Google': 'Sign Up With Google'}
                </LoginButton>
                <Line/>
                <ViewChange>
                    <ViewText>
                        {isLogin ? "Don't have an account?" : 'Already have an account?'}
                    </ViewText>
                    <ViewButton onClick={toggleView}>
                        {isLogin ? 'Sign up' : 'Log in'}
                    </ViewButton>
                </ViewChange>
            </Wrapper>
        </div>
    );
};

export default LoginView;
