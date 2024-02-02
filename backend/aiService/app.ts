import express from 'express';
import routes from './src/routes';

const app = express();
//Get PORT number at run time from environment variable
const PORT = process.env.PORT || 3000;

//Middleware
app.use(express.json());

//Call API execution
app.use('/api', routes);

//Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.log(err.stack);
    res.status(500).send('Internal error');
});

app.listen(PORT, () => {
    console.log('Server listening on the port ' + PORT);
})