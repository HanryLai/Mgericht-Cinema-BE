import { NextFunction, Request, Response } from 'express';
import * as accountService from '../../services/Account/account.service';

//login account
export const login = async (req: Request, res: Response, next: NextFunction) => {
   try {
      const account = req.body;
      const result = await accountService.login(account);
      res.status(200).json(result);
   } catch (error) {
      next(error);
   }
};

// register new account
export const register = async (req: Request, res: Response, next: NextFunction) => {
   try {
      const body = req.body;
      const result = await accountService.register(body);
      console.log(result);
      res.status(200).json(result);
   } catch (error) {
      next(error);
   }
};
