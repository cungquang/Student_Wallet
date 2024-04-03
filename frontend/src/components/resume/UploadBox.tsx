import React, { useState } from 'react';
import styled from 'styled-components';

interface UploadBoxProps {
    width: number;
    height: number;
    onFileUpload: (file: File) => void;
    children: string;
}

const UploadButton = styled.label<{ width: number; height: number }>`
    width: ${(props) => props.width}px;
    height: ${(props) => props.height}px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: none;
    border: 2px solid #B0B0B0;
    border-radius: 20px;
    cursor: pointer;
    transition: border 0.3s;
    &:hover {
        border: 2px solid #D6F9EC;
    }
`;

const HiddenInput = styled.input`
    display: none;
`;

const UploadBox: React.FC<UploadBoxProps> = ({ width, height, onFileUpload, children }) => {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [fileName, setFileName] = useState<string | null>(null);
  
    const uploadFileHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            if (file.type !== 'application/pdf') {
                setErrorMessage('Invalid file type. Please upload a PDF document.');
            } else {
                setErrorMessage(null);
                setFileName(file.name);
                onFileUpload(file);
            }
        }
    };
  
    return (
    <>
        <UploadButton htmlFor="file-upload" width={width} height={height}>
            {fileName ? fileName : children}
        </UploadButton>
        <HiddenInput
            id="file-upload"
            type="file"
            accept=".pdf"
            onChange={uploadFileHandler}
            />
        {errorMessage && <p>{errorMessage}</p>}
    </>
    );
};
  
export default UploadBox;