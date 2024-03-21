import '../../assets/budget.css'
import React, { useState } from 'react';
import axios from 'axios';
import { sign } from 'crypto';

//Configure URL
//const UPLOAD_SERVICE_IP = process.env.UPLOAD_SERVICE_API_IP || 'localhost:3001';
//const LOGIN_SERVICE_IP = process.env.LOGIN_SERVICE_API_IP || 'localhost:4000';

const UPLOAD_SERVICE_IP = process.env.UPLOAD_SERVICE_API_IP || '34.130.132.234';
const LOGIN_SERVICE_IP = process.env.LOGIN_SERVICE_API_IP || 'localhost:4000';

//const AI_SERVICE_URL = `${process.env.AI_SERVICE_API_URL}` || 'https://aiservicereadreceipt.azurewebsites.net/api/aiserviceextractreceipt';
const AI_SERVICE_URL = 'https://aiservicereadreceipt.azurewebsites.net/api/aiserviceextractreceipt';
const DECODE_TOKEN_URL = `http://${LOGIN_SERVICE_IP}/decode-token`;
const UPLOAD_FILE_URL = `http://${UPLOAD_SERVICE_IP}/api/file/upload`;
const UPLOAD_GETSIGNEDUPR_URL = `http://${UPLOAD_SERVICE_IP}/api/file/getsignedurl`;
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
        formData.append('file', file);

        //Upload the file to blob
        const res_upload = await axios.post(UPLOAD_FILE_URL, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        //Retrieve information from response
        const { objectName, createdDate, lastModified } = res_upload.data; 
        console.log(objectName);

        //Get signed URL to enable accessing the uploaded file
        const res_getSignedUrl = await axios.get(UPLOAD_GETSIGNEDUPR_URL, {
          params: {
            objectName: objectName
          }
        });
        const signedUrl = res_getSignedUrl.data;
      

        console.log(signedUrl);

        // const signedUrl = "https://storage.googleapis.com/upload-bucket-storage/16a581bb-08f6-4d92-8d50-5acce072c1ef.png?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=admincmpt372%40cmpt372-finalproject.iam.gserviceaccount.com%2F20240320%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20240320T215016Z&X-Goog-Expires=298&X-Goog-SignedHeaders=host&X-Goog-Signature=246c4fb5ad624fc449b678b8bd4a1ade3302096e4c128c51f985cc105509276454c65c8e55306ce43a7d5b7eea4e233a939ace63f81106cbc93c034cf2d3f94d82d558957b7c2748f8129497079ed7dbd9b1a2e84b20cb920f53e531ff77c8e16a4d091d120515af8c029829b6411add8532af2d3f820734fc37823cd200cef5d8d52b808c77cf73039a88ea4fcfc836e149c14b0ead157bad90eccf0199b1e17698f13394626a9a9eeb4608fc3117d3e28cff4ec02ea199831223cf35136d5061260dd5b4130ee50284cfdee08108c0ef51da28aee42b3cb69daba0229b029aacc770e3724ab2d50dac91d7bae9c265165b9089c196da0e270cfd66c0aed283";
        // const receiptData = await axios.post(AI_SERVICE_URL, { RequestUrl: signedUrl });
        // console.log(receiptData);


        //Get access token
        const storedToken = localStorage.getItem('accessToken');

        //Access local storage -> get "access token"
        //test URL: 'http://localhost:4000/decode-token'
        //const decodedTokenResponse = await axios.post(DECODE_TOKEN_URL, { accessToken: storedToken });
        //const userId = decodedTokenResponse.data.uid || 'tester2';
        const userId = 'tester2';       

        // //Read data in the receipt
        // const receiptData = await axios.post(AI_SERVICE_URL, { RequestUrl: signedUrl });
        // console.log(receiptData);

        // //Temporary store into local storage => allow user to modify before writing into Finance database
        // localStorage.setItem('recent_receipt', JSON.stringify({
        //   userId: userId,
        //   objectName: objectName,
        //   receiptData: receiptData.data
        // }));

        // //Write into the database:
        // const recordFile = {
        //   userId: userId,
        //   objectName: objectName,
        //   createdDate: createdDate,
        //   lastModified: lastModified,
        //   isRead: true,
        //   isReceipt: false
        // }
        
        // //Post record of the uploaded file into database
        // //test url: 'http://localhost:2024/api/fileMetadata/insertRecord'
        // const uploadDbResponse = await axios.post(UPLOAD_METADATA_URL, recordFile);
        
        // //Console log
        // if (uploadDbResponse.status === 200) {
        //     setUploadStatus('Upload file successfully!');
        // }



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