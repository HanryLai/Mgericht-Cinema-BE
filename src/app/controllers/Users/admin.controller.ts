import { Response, NextFunction, Request } from 'express';

import * as Admin_Service from '../../services/Users/admin.service';
import {
    HTTP_BAD_REQUEST,
    HTTP_UNAUTHORIZED,
    HTTP_INTERNAL_SERVER_ERROR,
    HTTP_SUCCESS,
    HTTP_CREATED,
    HTTP_FORBIDDEN,
} from '../../constants/http-status/status';
import { validateID } from '../../utils/validations/validateID';
export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        validateID(id);
        const user = await Admin_Service.deleteUser(id);
        res.status(HTTP_SUCCESS).json(user);
    } catch (error) {
        next(error);
    }
};

export const loginAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        try {
            const admin = await Admin_Service.loginAdmin(req.body);
            res.cookie('refreshToken', admin.verificationToken);
            res.status(HTTP_SUCCESS).json(admin);
        } catch (error) {
            next(error);
        }
    } catch (error) {
        next(error);
    }
};

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.id;
        validateID(id);
        const user = await Admin_Service.updateUser(id, req.body);
        res.status(HTTP_SUCCESS).json(user);
    } catch (error) {
        next(error);
    }
};
