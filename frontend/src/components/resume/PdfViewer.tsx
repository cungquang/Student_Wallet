import React from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import styled from 'styled-components';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

interface PdfViewerProps {
    file: string; // URL of the PDF file
    width: number;
    height: number;
}

const StyledPage = styled(Page)`
    background-color: transparent !important;
`;

const PdfViewer: React.FC<PdfViewerProps> = ({ file, width, height}) => {
    return (
        <div style={{ width, height}}>
            <Document file={file}>
                <StyledPage pageNumber={1} width={width} height={height} renderTextLayer={false}/>
            </Document>
        </div>
    );
};

export default PdfViewer;