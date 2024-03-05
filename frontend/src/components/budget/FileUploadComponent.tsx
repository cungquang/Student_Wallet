import '../../assets/budget.css'
import React, { useState } from 'react';
import axios from 'axios';

const FileUploadComponent: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [filePath, setFilePath] = useState<string>('');

  //Function handle use select file
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];

      setFile(selectedFile);
      setFilePath(selectedFile.name);           // Set file path
    }
  };

  //Function handle upload
  const handleUpload = async () => {
    if (!file) return;

    try {
        const formData = new FormData();
        formData.append('file', file);

        //Access local storage -> get "access token" -> 


        //Need to update Upload URL
        const response = await axios.post('YOUR_UPLOAD_URL', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        console.log('File uploaded successfully:', response.data);

        // Reset file state after successful upload
        setFile(null);
        setFilePath('');
    } catch (error) {
        console.error('Error uploading file:', error);
    }
  };

  return (
    <div className='file-external-container'>
        <div className="file-upload-container">
            <input type="file" onChange={handleFileChange} />
            <div>{filePath ? filePath : 'Click to Select File to Upload'}</div>
            {file && ''}
        </div>
        <div className='upload-button'>
            <button onClick={handleUpload}>Upload</button>
        </div>
    </div>

  );
};

export default FileUploadComponent;