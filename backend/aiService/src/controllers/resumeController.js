const { getDB } = require('../../db');
const { ObjectId } = require('mongodb');
const { GridFSBucket } = require('mongodb');
const streamifier = require('streamifier');
const path = require('path');
const { getJobs } = require('./chatGptController');
const fs = require('fs');

const getResumeAll = async (req, res) =>{
    try{
        const db = getDB();
        const result = await db.collection('resumes').find().toArray();
        res.status(200).json({result: result});
    } catch (error){
        res.status(400).json({
            message: ("Error while retrieving resumes: ", error.message)
        })
    }
}

const getUserResumeAll = async (req, res) =>{
    try{
        const db = getDB();
        const result = await db.collection('resumes').find({uid: req.params.uid}).toArray();
        res.status(200).json({result: result});
    } catch (error){
        res.status(400).json({
            message: ("Error while retrieving resumes for this user: ", error.message)
        })
    }
}

const getThisResumeJobs = async (req, res) =>{
    try{
        const db = getDB();
        const result = await db.collection('resumes').findOne({_id: req.params._id});
        res.status(200).json({result: result.jobs});
    } catch (error){
        res.status(400).json({
            message: ("Error while retrieving this resume: ", error.message)
        })
    }
};

const getThisResumeFile = async (req, res) =>{
    try{
        const db = getDB();
        const result = await db.collection('resumes').findOne({_id: req.params._id});
        const bucket = new GridFSBucket(db);
        const downloadStream = bucket.openDownloadStream(new ObjectId(result.resumeId));
        
        // Set response headers for PDF
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `inline; filename="${result.fileName}"`);

        // Pipe the PDF stream to response
        downloadStream.pipe(res);

    } catch (error){
        res.status(400).json({
            message: ("Error while retrieving this resume file: ", error.message)
        })
    }
};

const createResume = async (req) => {
    try {
        const db = getDB();
        const newData = { ...req.body };
        newData._id = new ObjectId().toHexString();
        newData.uid = req.params.uid;

        // Get file data
        const file = req.files.resume;
        const pdfBuffer = file.data;
        const filename = file.name;

        // Save PDF file to MongoDB using GridFS
        const bucket = new GridFSBucket(db);
        const uploadStream = bucket.openUploadStream(filename);
        const fileId = uploadStream.id;
        await new Promise((resolve, reject) => {
            const stream = streamifier.createReadStream(pdfBuffer);
            stream.pipe(uploadStream)
                .on('error', reject)
                .on('finish', resolve);
        });

        newData.resumeId = fileId;
        newData.fileName = filename;
        newData.createdAt = new Date();

        await db.collection('resumes').insertOne(newData);
    } catch (error) {
        console.log(error.message);
        throw error;
    }
};

const deleteResume = async(req, res) =>{
    try{
        const db = getDB();
        await db.collection('resumes').deleteOne({ _id: req.params._id });
        res.status(201).json({message: "Resume deleted: " + req.params._id});
    } catch (error){
        res.status(400).json({
            message: ("Error while deleting the resume: ", error.message)
        })
}}

const uploadResume = async (req, res) => {
    try {
        const file = req.files.resume; // data from the file upload input field
        const filePath = path.join(__dirname, '../../temp_storage', file.name);
        file.mv(filePath, async (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Failed to upload file.');
            }
            try {
                const tokens = await preprocessPDF(filePath);
                const jobs = await getJobs(tokens); // Get suitable jobs using ChatGPT
                // const jobs = "this is the test token";
                const uid = req.params.uid;
                await createResume({
                    body: {
                        jobs: jobs,
                    },
                    params: {
                        uid: uid
                    },
                    files: {
                        resume: file,
                    }
                });

                // Remove the file after processing
                fs.unlink(filePath, (err) => {
                    if (err) {
                        console.error('Error removing file:', err);

                    } else {
                        console.log('File removed:', filePath);
                    }
                });
                return res.status(200).send("Successfully uploaded/processed resume.");
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
    getResumeAll,
    getUserResumeAll,
    getThisResumeJobs,
    getThisResumeFile,
    createResume,
    deleteResume,
    uploadResume
}