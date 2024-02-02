import { Request, Response } from "express";

class ChatGptController {
    async postQuestion(req: Request, res: Response): Promise<void> {
        try {
            //DO SOME TASKS HERE

            res.json("Hello from ChatGPT")
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error'});
        }
    }

    //ADD MORE FUNCTION AS NEED
}

export default new ChatGptController;