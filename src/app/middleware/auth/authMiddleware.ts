import { Response, Request, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import {
    HTTP_BAD_REQUEST,
    HTTP_UNAUTHORIZED,
    HTTP_INTERNAL_SERVER_ERROR,
    HTTP_SUCCESS,
    HTTP_CREATED,
    HTTP_FORBIDDEN,
} from '../../constants/http-status/status';
import { getErrorMessage } from '../../utils/err/errorMessage';
declare global {
    namespace Express {
        interface Request {
            user?: any;
            id?: any;
            token?: any;
            role?: any;
        }
    }
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (req.headers?.authorization?.startsWith('Bearer ')) {
            const token = req.headers?.authorization.split('Bearer ')[1];
            const decode = jwt.verify(token, process.env.JWT_SECRET as string);
            if (!decode) {
                throw new Error('token not vaild');
            }
            req.id = JSON.parse(JSON.stringify(decode)).refreshToken;
            req.token = token;
            req.role = JSON.parse(JSON.stringify(decode)).role;
        } else {
            throw new Error("You're not attached Bearer");
        }
        next();
    } catch (error) {
        res.status(HTTP_BAD_REQUEST).json(getErrorMessage(error));
    }
};
