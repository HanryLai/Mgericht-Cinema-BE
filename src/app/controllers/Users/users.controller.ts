import { Response, NextFunction, Request } from 'express';
import * as User_Service from '../../services/Users/users.service';
import {
    HTTP_BAD_REQUEST,
    HTTP_UNAUTHORIZED,
    HTTP_INTERNAL_SERVER_ERROR,
    HTTP_SUCCESS,
    HTTP_CREATED,
    HTTP_FORBIDDEN,
} from '../../constants/http-status/status';
import { validateID } from '../../utils/validations/validateID';
export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await User_Service.login(req.body);
        res.cookie('refreshToken', user.verificationToken);
        res.status(HTTP_SUCCESS).json(user);
    } catch (error) {
        next(error);
    }
};

export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newUser = await User_Service.register(req.body);
        res.status(HTTP_CREATED).json(newUser);
    } catch (error) {
        next(error);
    }
};

export const logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // const id: string = req.params.idUser;
        console.log('id: ' + req.id);
        const user = await User_Service.logout(req.token);
        res.clearCookie('refreshToken');
        res.status(HTTP_SUCCESS).json(user);
    } catch (error) {
        next(error);
    }
};

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const allUsers = await User_Service.getAllUsers();
        res.status(HTTP_SUCCESS).json(allUsers);
    } catch (error) {
        next(error);
    }
};

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        validateID(req.params.id);
        const user = await User_Service.getUser(req.params.id);
        res.status(HTTP_SUCCESS).json(user);
    } catch (error) {
        next(error);
    }
};

export const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        validateID(req.params.id);
        if (req.headers.authorization?.startsWith('Bearer ')) {
            const id: string = req.params.id;
            const oldToken: string = req.headers.authorization.split(' ')[1];

            const user = await User_Service.refreshToken(id, oldToken);
            res.status(HTTP_SUCCESS).json(user);
        } else {
            const notAttach = new Error('You not attach token');
            next(notAttach);
        }
    } catch (error) {
        next(error);
    }
};

// export const resetPassword = async(req:Request,res:Response,next:NextFunction)=>{
//     try {
//         const token = req.token
//         const foundUser = await User_Service.resetPassword(token)
//     } catch (error) {

//     }
// }

export const forgetPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const email = req.body.email;
        const username = req.body.username;
        const newPassword = req.body.password;
        const user = await User_Service.forgetPassword(username, email, newPassword);
        res.status(HTTP_SUCCESS).json(user);
    } catch (error) {
        next(error);
    }
};

export const changePassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.id;
        const token = req.token;
        const password = req.body.password;
        const newPassword = req.body.newPassword;
        const user = await User_Service.changePassword(id as string, token as string, password, newPassword);
        res.status(HTTP_SUCCESS).json(user);
    } catch (error) {
        next(error);
    }
};

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.id;
        const token = req.token;
        const user = await User_Service.updateUser(id, token, req.body);
        res.status(HTTP_SUCCESS).json(user);
    } catch (error) {
        next(error);
    }
};
