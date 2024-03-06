import UserService from '../../services/user.service';
import { NextFunction, Request, Response } from 'express';

class UserController {
   static register = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await UserService.register(req.body);
            res.status(200).json({ result });
        } catch (error) {
            console.error(error);
            next(error);
        }
    };
}

export default  UserController;
