const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./db');
const { uploadResume } = require('./src/controllers/resumeController');
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

  // Get all resume data
  app.get('/resumes', getResumeAll)
  // Get all resume data for a specific user
  app.get('/resumes/users/:uid', getUserResumeAll)

  //------ POST -------//
  app.post('/resumes/add/:uid', createResume);


  //------ DELETE -------//
  app.delete('/resumes/delete/:_id', deleteResume);
  

    //------ UPDATE -------//
  app.put('/assignments/update/:_id', updateAsn);

  // store uploded file (including preprocessing)
  app.post('/upload', uploadResume);

  //------ SERVER -------//
  app.listen(3003, () => {
    console.log('Server is running on port 3003');
  });
});
