import { Request, Response, NextFunction } from 'express';
import * as jwtTool from '../jwt';
import { isErr } from '../../utils/Err/isError';
import { HttpResponse } from '../../domain/http/response';
export const isAdminOrEmployee = (
   req: Request,
   res: Response,
   next: NextFunction,
): void | Promise<Response<HttpResponse>> => {
   try {
      const token = jwtTool.getToken(req);
      if (isErr(token)) throw token;
      const payload: jwtTool.jwt = jwtTool.decodeJwt(token as string);
      if (payload.role !== 'admin' && payload.role !== 'employee') {
         throw new Error("You're not permission employee or admin");
      }
      req.id = payload.id;
      req.token = token as string;
      req.role = payload.role;
      if (req.id === undefined || req.token === undefined || req.role === undefined)
         throw new Error('Data middleware error');
      next();
   } catch (error) {
      throw error;
   }
};
