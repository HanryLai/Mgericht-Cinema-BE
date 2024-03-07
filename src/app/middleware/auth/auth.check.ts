import { Request, Response, NextFunction } from 'express';
import { HTTP_FORBIDDEN } from '../../constants/http-status/status';
import { getErrorMessage } from '../../utils/err/errorMessage';
import apiTokenService from '../../services/apiToken.service';
const HEADER = {
    API_KEY: 'x-api-key',
    AUTHORIZATION: 'authorization',
};
export const apiKey = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const key = req.headers[HEADER.API_KEY]?.toString();
        if (!key) {
            return res.status(HTTP_FORBIDDEN).json({
                message: getErrorMessage('API key is Forbidden'),
            });
        }
        const objKey = await apiTokenService.findById(key);
        if (!objKey) {
            return res.status(HTTP_FORBIDDEN).json({
                message: getErrorMessage('API key is Forbidden'),
            });
        }
        console.log('objKey:', objKey);
    } catch (error) {}
};
