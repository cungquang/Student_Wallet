const { getDB } = require('../../db');
const { ObjectId } = require('mongodb');

const path = require('path');
const { getJobs } = require('./chatGptController');

const uploadResume = async (req, res) => {
    try {
        const file = req.files.resume; // data from the file upload input field
        const filePath = path.join(__dirname, '../../temp_storage', file.name);
        file.mv(filePath, async (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Failed to upload file.');
            }
            // Implement the code to communicate with chatgpt
            // make each process a separate function
            // 1. send the tokens to chatgpt (ask chatGPT to generate a list of 5 most suitable jobs for this resume tokens(only job titles))
            // 2. receive the response from chatgpt ( ex) const jobs = await getJobs(tokens); getJobs is the function that you will implement)
            try {
                const tokens = await preprocessPDF(filePath);
                const jobs = await getJobs(tokens); // Get suitable jobs using ChatGPT
                console.log('Suitable jobs:', jobs);
                return res.status(200).send("File uploaded & processed successfully.");
            } catch (error) {
                console.error('Error processing resume:', error);
                return res.status(500).send('Error processing resume.');
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send('Internal Server Error');
    }
};

const preprocessPDF = async (pdfFilePath) => { 
    const pdfjsLib = await import('pdfjs-dist');
    return new Promise((resolve, reject) => {
        // Load PDF file
        pdfjsLib.getDocument(pdfFilePath).promise.then(pdf => {
            let totalPages = pdf.numPages;
            let englishTokens = [];

            // Function to extract text from a page
            function extractTextFromPage(pageNumber) {
                return pdf.getPage(pageNumber).then(page => {
                return page.getTextContent().then(textContent => {
                    let pageText = textContent.items.map(item => item.str);
                    englishTokens = englishTokens.concat(filterEnglishTokens(pageText));
                });
                });
            }

            // Function to filter English tokens from a list of tokens
            function filterEnglishTokens(tokens) {
                // Regular expression to match English words
                let englishRegex = /[a-zA-Z]+/g;
                return tokens.filter(token => token.match(englishRegex));
            }

            // Loop through each page to extract text
            let promises = [];
            for (let i = 1; i <= totalPages; i++) {
                promises.push(extractTextFromPage(i));
            }

            // Wait for all pages to be processed
            Promise.all(promises).then(() => {
                resolve(englishTokens);
            }).catch(error => {
                reject(error);
            });
        }).catch(error => {
            reject(error);
        });
    });
}

module.exports = {
    uploadResume
}