const express = require('express');
const cors = require('cors');
const {dbConnection} = require('./db')
const {getAsnAll,  getUserAsnAll,createAsn, deleteAsn, updateAsn} = require('./src/controllers/asnController')

const app = express();
app.use(cors());
app.use(express.json()); 

const PORT = 3003;

dbConnection()
.then(()=>{

  //------ GET -------//

  // Get all assignments
  app.get('/assignments', getAsnAll)
  // Get all assignments for a specific user
  app.get('/assignments/users/:uid', getUserAsnAll)

  //------ POST -------//
  app.post('/assignments/add/:uid', createAsn);


  //------ DELETE -------//
  app.delete('/assignments/delete/:_id', deleteAsn);
  

    //------ UPDATE -------//
  app.put('/assignments/update/:_id', updateAsn);
  

  //------ SERVER -------//
  app.listen(PORT, () =>{
    console.log('Server is running on port 3003');
  })
})

.catch(error=>{
  console.error('Error connecting to database:', error);
  process.exit(1);
})


