const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./db');
const { uploadResume } = require('./src/controllers/resumeController');
const fileUpload = require('express-fileupload');

const app = express();
app.use(cors());
app.use(express.json());
app.use(fileUpload());

app.get('/', (req, res) => {
  res.send('Server is running and reachable!');
});

// store uploded file (including preprocessing)
app.post('/upload', uploadResume);

//------ SERVER -------//
app.listen(3003, () => {
  console.log('Server is running on port 3003');
});


// dbConnection()
// .then(()=>{
//   app.get('/', (req, res) => {
//     res.send('Server is running and reachable!');
//   });
//   //------ GET -------//

//   // Get all assignments
//   app.get('/resumes', getResumeAll);

//   //------ SERVER -------//
//   app.listen(3003, () =>{
//   console.log('Server is running on port 3003');
//   })
// })

// .catch(error=>{
//   console.error('Error connecting to database:', error);
//   process.exit(1);
// })