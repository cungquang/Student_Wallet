import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import PdfViewer from './PdfViewer'; // assuming PdfViewer.tsx is in the same directory


interface ResumeImageProps {
    assessId: string | null;
}

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 600px; 
    max-height: 700px;
    overflow: hidden; 
`;

const ResumeImage: React.FC<ResumeImageProps> = ({ assessId }) =>{
    const [pdfUrl, setPdfUrl] = useState<string | null>(null);

    useEffect(() => {
        const fetchPdf = async () => {
            try {
                if (assessId) {
                    const ResumeIP = process.env.RESUME_SERVICE_IP || "localhost";
                    const response = await axios.get(`http://${ResumeIP}:3003/resumes/file/${assessId}`, {
                        responseType: 'blob',
                    });
                    const pdfUrl = URL.createObjectURL(response.data);
                    setPdfUrl(pdfUrl);
                }
            } catch (error) {
                console.error('Error fetching file path:', error);
            }
        };
        fetchPdf();
    }, [assessId]);

    return (
        <Wrapper>
            {pdfUrl && <PdfViewer file={pdfUrl} width={550} height={700} />}
        </Wrapper>
    );
};

export default ResumeImage;
