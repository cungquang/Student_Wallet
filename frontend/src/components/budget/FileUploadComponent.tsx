import '../../assets/budget.css'
import React, { useState } from 'react';
import axios from 'axios';

//Configure URL
//const UPLOAD_SERVICE_IP = process.env.UPLOAD_SERVICE_API_IP || 'localhost:3001';
//const LOGIN_SERVICE_IP = process.env.LOGIN_SERVICE_API_IP || 'localhost:4000';

const UPLOAD_SERVICE_IP = process.env.UPLOAD_SERVICE_API_IP || '34.130.3.104';
const LOGIN_SERVICE_IP = process.env.LOGIN_SERVICE_API_IP || 'localhost:4000';

//const AI_SERVICE_URL = `${process.env.AI_SERVICE_API_URL}` || 'https://aiservicereadreceipt.azurewebsites.net/api/aiserviceextractreceipt';
const AI_SERVICE_URL = 'https://aiservicereadreceipt.azurewebsites.net/api/aiserviceextractreceipt';
const DECODE_TOKEN_URL = `http://${LOGIN_SERVICE_IP}/decode-token`;
const UPLOAD_FILE_URL = `http://${UPLOAD_SERVICE_IP}/api/file/upload`;
const UPLOAD_METADATA_URL = `http://${UPLOAD_SERVICE_IP}/api/fileMetadata/insertRecord`;


const FileUploadComponent: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [filePath, setFilePath] = useState<string>('');
  const [uploadStatus, setUploadStatus] = useState<string>('');

  //Function handle use select file
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];

      setFile(selectedFile);
      setFilePath(selectedFile.name);           // Set file path
    }
  };

  //Function handle upload
  const handleUpload = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!file) return;

    try {
        //Get file data
        const formData = new FormData();
        formData.append('fileInput', file);
        
        //Get access token
        const storedToken = localStorage.getItem('accessToken');

        //Access local storage -> get "access token"
        //test URL: 'http://localhost:4000/decode-token'
        //const decodedTokenResponse = await axios.post(DECODE_TOKEN_URL, { accessToken: storedToken });
        //const userId = decodedTokenResponse.data.uid || 'tester2';
        const userId = 'tester2';

        //Upload the file to blob
        const response = await axios.post(UPLOAD_FILE_URL, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        if (response.status === 200) {
          setUploadStatus('File uploaded successfully!');
        }

        //Retrieve information from response
        const { objectName, signedUrl, createdDate, lastModified } = response.data;        

        //Read data in the receipt
        //Test URL: `http://localhost:3001/api/file/upload`;
        const receiptData = await axios.post(AI_SERVICE_URL, { RequestUrl: signedUrl });
        
        //Temporary store into local storage => allow user to modify before writing into Finance database
        localStorage.setItem('recent_receipt', JSON.stringify({
          userId: userId,
          objectName: objectName,
          receiptData: receiptData.data
        }));

        //Write into the database:
        const recordFile = {
          userId: userId,
          objectName: objectName,
          createdDate: createdDate,
          lastModified: lastModified,
          isRead: true,
          isReceipt: false
        }
        
        //Post record of the uploaded file into database
        //test url: 'http://localhost:2024/api/fileMetadata/insertRecord'
        const uploadDbResponse = await axios.post(UPLOAD_METADATA_URL, recordFile);
        
        //Console log
        if (uploadDbResponse.status === 200) {
            setUploadStatus('Upload file successfully!');
        }

        // Reset file state after successful upload
        setFile(null);
        setFilePath('');
    } catch (error) {
        console.error('Error uploading file:', error);
    }
  };

  return (
    <div className='file-external-container'>
      <form onSubmit={handleUpload}>
        <div className="file-upload-container">
            <input type="file" onChange={handleFileChange} />
            <div>{filePath ? filePath : 'Click to Select File to Upload'}</div>
            {file && ''}
        </div>
        <div className='upload-button'>
            <button type="submit">Upload</button>
            <br/>
            {uploadStatus && ''}
        </div>
      </form>
    </div>

  );
};

export default FileUploadComponent;