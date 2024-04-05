const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./db');
const { uploadResume, getResumeAll, getUserResumeAll, getThisResumeJobs, getThisResumeFile, deleteResume } = require('./src/controllers/resumeController');
const fileUpload = require('express-fileupload');

const app = express();
app.use(cors());
app.use(express.json());
app.use(fileUpload());

dbConnection()
.then(()=>{
  app.get('/', (req, res) => {
    res.send('Server is running and reachable!');
  });

  //------ DB -------//
  // Get all resume data
  app.get('/resumes', getResumeAll) // not used for this project

  // Get all resume data for a specific user
  app.get('/resumes/user/:uid', getUserResumeAll)

  // Get recommened jobs for specific resume data 
  app.get('/resumes/jobs/:_id', getThisResumeJobs);

  // Get resume file for specific resume data 
  app.get('/resumes/file/:_id', getThisResumeFile);

  // Delete a specific resume data
  app.delete('/resumes/delete/:_id', deleteResume);


  //------ Backend -------//
  // store uploded file (including preprocessing)
  app.post('/upload/user/:uid', uploadResume);

  //------ SERVER -------//
  app.listen(3003, () => {
    console.log('Server is running on port 3003');
  });
})
.catch(error=>{
  console.error('Error connecting to database:', error);
  process.exit(1);
});
