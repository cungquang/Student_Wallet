import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyDI26Bw2RZkbNJp-U77lA3v_fX_Wou_hWQ",
    authDomain: "jooeunpark301414492.firebaseapp.com",
    projectId: "jooeunpark301414492",
    storageBucket: "jooeunpark301414492.appspot.com",
    messagingSenderId: "119117724944",
    appId: "1:119117724944:web:b7d3637b1b0199b8e73995"
};
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
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

const PasswordWrapper = styled.div`
    position: relative;
`;

const PasswordToggleButton = styled.button`
    position: absolute;
    top: 50%;
    right: 10px;
    font-family: Inika;
    font-size: 15px;
    transform: translateY(-50%);
    color: #b0b0b0;
    background: none;
    border: none;
    cursor: pointer;
`;

const PasswordTextField = styled.input`
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


const InvalidWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 303px;
    height: 25px;
    margin: 0 0 5px 0;
`;

const InvalidText = styled.div<{ isVisible: boolean, }>`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 17px;
    font-family: Inika;
    color: red;
    height: 100%;
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

    const navigate = useNavigate();

    const [signupMSG, setSignupMSG] = useState(true);
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [iscredValid, setIsCredValid] = useState(true);
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('default message');
    const [showPassword, setShowPassword] = useState(false);

    const SwitchPage = (path: string) => {
        navigate(path);
    };

    useEffect(() => {

        //Retrieve access token from the localstorage
        const storedToken = localStorage.getItem('accessToken');
        if (storedToken) {
            verifyToken(storedToken);
        }
    }, []);


    const verifyToken = async (accessToken: string) => {
        try {
            const verifyRes = await axios.get(`/check-user`, {
                headers: {
                    authorization: `Bearer ${accessToken}`
                }
            });

            console.log("Verification response: ", verifyRes);
            try {
                const response = await axios.post(`/decode-token`, { accessToken: accessToken });

                const userInfo = response.data.decodedToken;

                const userRes = await axios.get(`/check-user`, {
                    headers: {
                        authorization: `Bearer ${accessToken}`
                    }
                });
                localStorage.setItem('uid', userInfo.uid);
                localStorage.setItem('email', userInfo.email);
                setMessage(`Hello ${userInfo.email} -- verified`);
                setIsLogin(true);
                setIsCredValid(true);
                SwitchPage('/selection');

            } catch (error) {
                console.error('Error decoding token:', error);
            }
        }
        catch (error: any) {
            console.error('Error verifying token: ', error);
            if (error.response === 401) {
                // Token expired, redirect to login screen
                navigate('/login');
            } else {
                setMessage('Error: Unable to verify token');
            }
        }
    }


    const handleSignIn = async () => {
        setSignupMSG(true);
        try {
            const response = await axios.post(`/signin`, { email, password });
            console.log(`UID: ${response.data.user.uid}`);

            // Do the second request after UID is obtained
            const accessToken = response.data.idToken;
            localStorage.setItem('accessToken', accessToken);

            verifyToken(accessToken);
        } catch (error: any) {
            setMessage(error.response.data.error);
            setIsCredValid(false);
        }
    };

    const handleSignUp = async () => {
        setSignupMSG(true);
        let Message = ''; // Initialize errorMessage variable
        try {
            const response = await axios.post(`/signup`, { email, password });
            if (response && response.data) {
                setMessage(response.data.message);
                const { uid, idToken } = response.data.user;

                const userResponse = await axios.get(`/user/${uid}`, {
                    headers: {
                        authorization: `Bearer ${idToken}`
                    }
                });
                setMessage(`Hello ${userResponse.data.email}`);
                Message = 'Sign up successful, you can log in now';
                setSignupMSG(false);
            } else {
                Message = 'Unexpected response format';
                setSignupMSG(false);
            }
        } catch (error: any) {
            if (error.response && error.response.data && error.response.data.error) {
                const errorResponse = error.response.data.error;
                if (errorResponse.includes('already')) {
                    Message = 'There is already an account with this email';
                } else if (errorResponse.includes('password')) {
                    Message = 'Password must be at least 6 characters';
                } else {
                    Message = 'Invalid email';
                }
                setSignupMSG(false);
            } else {
                Message = 'Unable to sign up';
            }
        }

        // Set the errorMessage to be displayed in InvalidText component
        setMessage(Message);
    };



    const handleSignInWithGoogle = async () => {
        setSignupMSG(true);
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            if (user) {
                const idToken = await user.getIdToken();
                localStorage.setItem('accessToken', idToken);

                verifyToken(idToken);

                setMessage('Login successful');
                console.log(`UID: ${user.uid}`);

            }
        } catch (error) {
            console.log(error);
            setMessage('Login failed');
            setIsCredValid(false);
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
        setSignupMSG(true);
        setIsCredValid(true);
    };

    const handleTogglePassword = () => {
        setShowPassword(!showPassword); // Toggle password visibility
    };

    return (
        <div>
            <Wrapper>
                <Heading>UniKeep</Heading>
                <TextField type="text" placeholder="Email" value={email} onChange={handleEmailChange} />
                <PasswordWrapper>
                    <PasswordTextField
                        type={showPassword ? "text" : "password"} // Set the type based on showPassword state
                        placeholder="Password"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                    <PasswordToggleButton onClick={handleTogglePassword}>
                        {showPassword ? "Hide" : "Show"}
                    </PasswordToggleButton>
                </PasswordWrapper>
                <InvalidWrapper>
                    <InvalidText isVisible={!signupMSG || !iscredValid}>
                        {isLogin ? 'Invalid credentials. Please try again' : message}
                    </InvalidText>
                </InvalidWrapper>
                <LoginButton onClick={isLogin ? handleSignIn : handleSignUp}>
                    {isLogin ? 'Log In' : 'Sign Up'}
                </LoginButton>
                <div style={{ margin: '20px', fontSize: '20px', fontFamily: 'Inika' }}>OR</div>
                <LoginButton onClick={handleSignInWithGoogle}>
                    {isLogin ? 'Log In With Google' : 'Sign Up With Google'}
                </LoginButton>
                <Line />
                <ViewChange>
                    <ViewText>
                        {isLogin ? "Don't have an account?" : 'Already have an account?'}
                    </ViewText>
                    <ViewButton onClick={toggleView}>
                        {isLogin ? 'Sign up' : 'Log in'}
                    </ViewButton>
                </ViewChange>
                {/* <p>{message}</p> */}
            </Wrapper>
        </div>
    );
};
export default LoginView;