import { Response, NextFunction, Request } from 'express';
import { isAdminExist } from '../../utils/validations/validateID';
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
        const idAdmin = req.id;
        const idUser = req.params.id;
        validateID(idUser);
        // check admin exist or not exist => becausce check admin with jwt. 2 way to solves is
        // 1. use function isAdminExist hand code
        // 2. detroy(token) when delete admin
        await isAdminExist(idAdmin);

        const user = await Admin_Service.deleteUser(idUser);
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
            // res.redirect('http://google.com'); => redirect to page google
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
        const idAdmin = req.id;
        const idUser = req.params.id;
        validateID(idUser);
        await isAdminExist(idAdmin);
        const user = await Admin_Service.updateUser(idUser, req.body);
        res.status(HTTP_SUCCESS).json(user);
    } catch (error) {
        next(error);
    }
};
