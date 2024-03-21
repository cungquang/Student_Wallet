import '../../assets/budget.css'
import React, { useState } from 'react';
import axios from 'axios';

//Configure URL
//const UPLOAD_SERVICE_IP = process.env.UPLOAD_SERVICE_API_IP || 'localhost:3001';
const UPLOAD_SERVICE_IP = process.env.UPLOAD_SERVICE_API_IP || '34.130.132.234';

//const AI_SERVICE_URL = `${process.env.AI_SERVICE_API_URL}` || 'https://aiservicereadreceipt.azurewebsites.net/api/aiserviceextractreceipt';
const AI_SERVICE_URL = 'https://aiservicereadreceipt.azurewebsites.net/api/aiserviceextractreceipt';
const UPLOAD_FILE_URL = `http://${UPLOAD_SERVICE_IP}/api/file/upload`;
const UPLOAD_GETSIGNEDURL_URL = `http://${UPLOAD_SERVICE_IP}/api/file/getsignedurl`;
const UPLOAD_METADATA_URL = `http://${UPLOAD_SERVICE_IP}/api/fileMetadata/insertRecord`;

interface FileUploadProps {
  setToEnable: (value: boolean) => void;
}

const FileUploadComponent: React.FC<FileUploadProps> = ({ setToEnable }) => {
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
        //Get access token
        const userId = localStorage.getItem('uid') || 'alex@test.com';
        
        //Get file data
        const formData = new FormData();
        formData.append('file', file);

        //Upload the file to blob
        const res_upload = await axios.post(UPLOAD_FILE_URL, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        //Retrieve information from response
        const { objectName, createdDate, lastModified } = res_upload.data; 

        //Get signed URL to enable accessing the uploaded file
        const res_getSignedUrl = await axios.get(UPLOAD_GETSIGNEDURL_URL, {
          params: {
            objectName: objectName
          }
        });
        const signedUrl = res_getSignedUrl.data;

        //Insert record of uploaded file into the database:
        const recordFile = {
          userId: userId,
          objectName: objectName,
          createdDate: createdDate,
          lastModified: lastModified,
          isRead: false,
          isReceipt: false
        }
        
        //Post record of the uploaded file into database
        const uploadDbResponse = await axios.post(UPLOAD_METADATA_URL, recordFile);
        if (uploadDbResponse.status === 200) {
            setUploadStatus('Upload file successfully!');
        }

        //Call API to read receipt 
        const receiptData = await axios.post(AI_SERVICE_URL, { RequestUrl: signedUrl });
        if (receiptData.status === 200) {
          setToEnable(true);
        }

        //Temporary store into local storage => allow user to modify before writing into Finance database
        localStorage.setItem('recent_receipt', JSON.stringify({
          userId: userId,
          objectName: objectName,
          receiptData: receiptData.data
        }));
        
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
            <button type="submit">Submit</button>
        </div>
        <div>
          {uploadStatus && <span>{uploadStatus}</span>}
        </div>
      </form>
    </div>
  );
};

export default FileUploadComponent;