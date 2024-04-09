import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/common/header';
import Footer from '../components/common/footer';
import UploadBox from '../components/resume/UploadBox';
import styled from 'styled-components';
import axios from 'axios';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 30px;
`;

const EnterWrapper = styled.div<{width: number; height: number;}>`
    width: ${(props) => props.width}px;
    height: ${(props) => props.height}px;
    display: flex;
    justify-content: space-between; /* Align buttons at the edges */
    align-items: center;
`;

const Button = styled.label<{ width: number; height: number; color: string }>`
    width: ${(props) => props.width}px;
    height: ${(props) => props.height}px;
    background-color: ${(props) => props.color};
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    cursor: pointer;
    transition: border 0.3s;
    margin: 10px;
    &:hover {
        background-color: #BCFFE7;
    }
`;

const ResumePage: React.FC = () => {
    const ResumeIP = "35.238.55.71"; 
    const uid = localStorage.getItem('uid');

    const [fileToUpload, setFileToUpload] = useState<File | null>(null);
    const navigate = useNavigate();

    const handleFileUpload = (file: File) => {
        setFileToUpload(file);
    };

    const handleBackButtonClick = () => {
        navigate('/selection');
    };

    const handleSubmitButtonClick = async () => {
        if (fileToUpload){
            const formData = new FormData();
            formData.append('resume', fileToUpload);
            const response = await axios.post(`http://${ResumeIP}/upload/user/${uid}`, formData);
            navigate('/resumeresult');
        }
        else{
            alert("Upload your resume first!");
        }
    };

    return (
        <div>
            <Header />
            <h1>Resume Assessment</h1>
            <Wrapper>
                <UploadBox width={750} height={250} onFileUpload={handleFileUpload} children={"Upload Your PDF Resume"}/>
                <EnterWrapper width={770} height={100}>
                    <Button onClick={handleBackButtonClick} width={150} height={50} color={"#D6F9EC"}>
                        Back
                    </Button>
                    <Button onClick={handleSubmitButtonClick} width={150} height={50} color={"#D6F9EC"}>
                        Submit
                    </Button>
                </EnterWrapper>
            </Wrapper>
            <Footer />
        </div> 
    );
};

export default ResumePage;