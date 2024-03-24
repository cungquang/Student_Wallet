import '../../assets/budget.css'
import React, { useState } from 'react';
import axios from 'axios';

//Configure URL
//const UPLOAD_SERVICE_IP = process.env.UPLOAD_SERVICE_API_IP || '34.130.3.104';

function combineItems(data: Record<string, any>, prefix = 'item', maxItems = Infinity) {
  const items = [];

  for (let i = 0; i < maxItems; i++) {
      const propertyName = `${prefix}${i}`;
      if (propertyName in data) {
          const item = JSON.parse(data[propertyName]);
          items.push(item);
      } else {
          break;
      }
  }

  return JSON.stringify(items);
}

interface FileUploadProps {
  byUser: string;
  ai_service_ip: string
  uploadStatus: string;
  setUploadStatus: (value: string) => void;
  setObjectName: React.Dispatch<React.SetStateAction<string>>;
  setByDate: React.Dispatch<React.SetStateAction<string>>;
  setByMerchant: React.Dispatch<React.SetStateAction<string>>;
  setTotalCost: React.Dispatch<React.SetStateAction<string>>;
  setTotalTax: React.Dispatch<React.SetStateAction<string>>;
  setListOfItems: React.Dispatch<React.SetStateAction<string>>;
}

const FileUploadComponent: React.FC<FileUploadProps> = ({ byUser, ai_service_ip, uploadStatus, setUploadStatus,
  setObjectName, setByDate, setByMerchant, setTotalCost, setTotalTax, setListOfItems }) => {
  const [file, setFile] = useState<File | null>(null);
  const [filePath, setFilePath] = useState<string>('');

  
  const AI_SERVICE_URL = 'https://aiservicereadreceipt.azurewebsites.net/api/aiserviceextractreceipt';
  const UPLOAD_FILE_URL = `http://${ai_service_ip}/api/file/upload`;
  const UPLOAD_GETSIGNEDURL_URL = `http://${ai_service_ip}/api/file/getsignedurl`;
  const UPLOAD_METADATA_URL = `http://${ai_service_ip}/api/fileMetadata/insertRecord`;

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

        //Get signed URL to enable accessing the uploaded file
        const res_getSignedUrl = await axios.get(UPLOAD_GETSIGNEDURL_URL, {
          params: {
            objectName: objectName
          }
        });
        const signedUrl = res_getSignedUrl.data;

        //Insert record of uploaded file into the database:
        const recordFile = {
          userId: byUser,
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
          //Need to verify is this a valid receipt before further processing => send notice to user
          // const UPDATE_RECEIPT_URL = `http://${UPLOAD_SERVICE_IP}/api/db/updateRecord?userId=${userId}&objectName=${objectName}`
          // await axios.put(UPDATE_RECEIPT_URL, { isRead: true, isReceipt: false });

          //Set data to the below form
          setObjectName(objectName);
          
          if (receiptData.data) {
              const newList = combineItems(receiptData.data);
              
              setByDate(receiptData.data.TransactionDate);
              setByMerchant(receiptData.data.MerchantName);
              setTotalCost(receiptData.data.Total);
              setTotalTax(receiptData.data.Tax);
              setListOfItems(newList);
          }
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
            <button id='fileUploadSubmit' type="submit">Submit</button>
        </div>
        <div>
          {uploadStatus && <span>{uploadStatus}</span>}
        </div>
      </form>
    </div>
  );
};

export default FileUploadComponent;