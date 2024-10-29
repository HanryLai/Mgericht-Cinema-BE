import { NextFunction, Response, Request } from 'express';
import { Role } from '../../models/users/user.model';
export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    try {
        if (req.role === Role.ADMIN) {
            next();
        } else {
            const err = new Error("You're not admin");
            throw err;
        }
    } catch (error) {
        throw error;
    }
};
