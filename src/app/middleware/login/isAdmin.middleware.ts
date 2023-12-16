import { NextFunction, Request, Response } from 'express';
import { HttpResponse } from '../../domain/http/response';
import { Status } from '../../enum/Status.enum';
import { Code } from '../../enum/Code.enum';
import { jwt } from '../jwt/jwt.interface';
import { getToken } from '../jwt/jwt';
import { isErr } from '../../utils/Err/isError';
import { decodeJwt } from '../jwt/decodeJwt';

export const isAdmin = (req: Request, res: Response, next: NextFunction): void => {
   try {
      const token: string | Error = getToken(req);
      if (isErr(token)) throw token;
      const payload: jwt = decodeJwt(token as string);
      console.log(payload);
      if (payload.role === 'admin') next();
      else throw new Error("you're not admin ");
   } catch (error: unknown) {
      next(error as Error);
   }
};