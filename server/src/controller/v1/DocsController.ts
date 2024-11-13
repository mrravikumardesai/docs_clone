import { Request, Response } from "express";

class DocsController {

    async addDoc(_req: Request, _res: Response) {
        try {
            _res.status(200).json("WORKING")
        } catch (error: any) {
            _res.status(500).json(
                {
                    success: false,
                    message: error.message
                }
            )
        }
    }

}

export default new DocsController()