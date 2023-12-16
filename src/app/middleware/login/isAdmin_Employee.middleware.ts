import { NextFunction, Request, Response } from 'express';
import { getToken } from '../jwt/jwt';
import { decodeJwt } from '../jwt/decodeJwt';
import { isErr } from '../../utils/Err/isError';
export const isAdminOrEmployee = (req: Request, res: Response, next: NextFunction) => {
   try {
      const token = getToken(req);
      if (isErr(token)) throw new Error(`Invalid toke: ${token}`);

      const { role } = decodeJwt(token as string);
      if (role === 'customer') throw new Error("you haven't permission");
      next();
   } catch (error) {
      next(error);
   }
};
