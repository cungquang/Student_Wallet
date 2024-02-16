import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

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
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [uid, setUid] = useState('');

    useEffect(() => {

        //Retrieve access token from the localstorage
        const storedToken = localStorage.getItem('accessToken');
        if (storedToken) {
            verifyToken(storedToken);
        }
    }, []);

    //Verify token from existing access token
    const verifyToken = async (accessToken: string) => {

        try {
            const verifyRes = await axios.get('http://localhost:3001/check-user', {
                headers: {
                    authorization: `Bearer ${accessToken}`
                }
            });
            
            console.log("Verification response: ", verifyRes);
            try {
                const response = await axios.post('http://localhost:3001/decode-token', { accessToken: accessToken });
                console.log('Decoded token:', response.data.decodedToken);

                const userInfo = response.data.decodedToken;

                setUid(userInfo.uid);
                const userRes = await axios.get(`http://localhost:3001/check-user`,{
                    headers: {
                        authorization: `Bearer ${accessToken}`
                    }
                },
                );
                setMessage(`Hello ${userInfo.email} -- verifed`);

            } catch (error) {
                console.error('Error decoding token:', error);
            }
        }
        catch (error) {
            console.error('Error verifying token: ', error);
            setMessage('Error: Unable to verify token');
        }
    }

    const handleSignIn = async () => {

        try {
            const response = await axios.post('http://localhost:3001/signin', { email, password });
            
            try {
            const accessToken = response.data.idToken;
            localStorage.setItem('accessToken', accessToken);
            await verifyToken(accessToken);
            
            const user = await axios.get(`http://localhost:3001/user/${uid}`)
            setMessage(`Hello ${user.data.email} -- userPage`);
            setIsLogin(true);
            }
            catch (error: any) {
                setMessage(error.responser);
                console.log(error);
            }
    

        } catch (error: any) {
            setMessage("Invalid login");
            console.log(error);
        }

    };

    const handleSignUp = async () => {
        try {
            const response = await axios.post('http://localhost:3001/signup', { email, password });
            if (response && response.data) {
                setMessage(response.data.message);
                const { uid, idToken } = response.data.user;
                setUid(uid);

                const userResponse = await axios.get(`http://localhost:3001/user/${uid}`, {
                    headers: {
                        authorization: `Bearer ${idToken}`
                    }
                });
                setMessage(`Hello ${userResponse.data.email}`);
            } else {
                setMessage('Error: Unexpected response format');
            }
        } catch (error: any) {
            if (error.response && error.response.data && error.response.data.error) {
                setMessage(error.response.data.error);
            } else {
                setMessage('Error: Unable to sign up');
            }
        }
    };


    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const toggleView = () => {
        setIsLogin(!isLogin);
    };

    return (
        <div>
            <Wrapper>
                <Heading>UniKeep</Heading>
                <TextField type="text" placeholder="ID" value={email} onChange={handleEmailChange} />
                <TextField type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
                <InvalidText isVisible={!isIDValid}>Invalid ID</InvalidText>
                <LoginButton onClick={isLogin ? handleSignUp : handleSignIn}>
                    {isLogin ? 'Sign Up' : 'Log In'}
                </LoginButton>
                <div style={{ margin: '20px', fontSize: '20px', fontFamily: 'Inika' }}>OR</div>
                <LoginButton>
                    {isLogin ? 'Sign Up With Google' : 'Log In With Google'}
                </LoginButton>
                <Line />
                <ViewChange>
                    <ViewText>
                        {isLogin ? 'Already have an account?' : "Don't have an account?"}
                    </ViewText>
                    <ViewButton onClick={toggleView}>
                        {isLogin ? 'Log in' : 'Sign up'}
                    </ViewButton>
                </ViewChange>
                <p>{message}</p>
            </Wrapper>
        </div>
    );
};

export default LoginView;
