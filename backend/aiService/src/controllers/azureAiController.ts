import { Request, Response } from "express";

class azureAiController {
    async postReadDocument(req: Request, res: Response): Promise<void> {
        try {
            //Call Azure AI Service
            
            //Store into Database

            res.json("Hello from read document")
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error'});
        }
    }

    //ADD MORE FUNCTION AS NEED
}

export default new azureAiController;