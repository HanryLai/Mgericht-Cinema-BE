import { NextFunction, Request, Response } from 'express';
import * as accountService from '../../services/Account/account.service';
import { isErr } from '../../constants/Err/isError';
import { getToken } from '../../middleware/jwt/jwt';
import { HttpResponse } from '../../domain/http/response';
import { Account, Detail_Information_Interface } from '../../models';
import { Code } from '../../enum/Code.enum';
import { Status } from '../../enum/Status.enum';
import { InsertResult, UpdateResult } from 'typeorm';
import { type } from 'os';
import { Register_Interface } from '../../interface/register.interface';

type UpdateType = UpdateResult | Error;
type InsertType = InsertResult | Error;
type TokenType = Error | String;
type detail_Information_Type = Detail_Information_Interface | Error;
type Account_Type = Account | Error;
//login account
export const login = async (
   req: Request,
   res: Response,
   next: NextFunction,
): Promise<Response<HttpResponse>> => {
   try {
      const account: Account = req.body;
      let result: UpdateType = await accountService.login(account);

      if (result instanceof UpdateResult) {
         res.setHeader('Authorization', result.raw[0].verification_Token);
         return res
            .status(Code.OK)
            .send(
               new HttpResponse(Code.OK, Status.OK, 'Login in with this account', result.raw[0]),
            );
      } else throw result;
   } catch (error: unknown) {
      return res
         .status(Code.NOT_FOUND)
         .send(new HttpResponse(Code.NOT_FOUND, Status.NOT_FOUND, error + ' '));
   }
};

export const logout = async (
   req: Request,
   res: Response,
   next: NextFunction,
): Promise<Response<HttpResponse>> => {
   try {
      const token: TokenType = getToken(req);
      if (isErr(token)) throw token;
      const result: UpdateType = await accountService.logout(token as string);
      if (result instanceof UpdateResult) {
         return res
            .status(Code.OK)
            .send(new HttpResponse(Code.OK, Status.OK, 'Log out successfully', result.raw[0]));
      } else throw result;
   } catch (error: unknown) {
      return res
         .status(Code.NOT_FOUND)
         .send(new HttpResponse(Code.NOT_FOUND, Status.NOT_FOUND, error + ' '));
   }
};

export const detail_Information = async (
   req: Request,
   res: Response,
   next: NextFunction,
): Promise<Response<HttpResponse>> => {
   try {
      const token: TokenType = getToken(req);
      if (isErr(token)) throw token;
      const result: detail_Information_Type = await accountService.detail_Information(
         token as string,
      );
      if (isErr(result)) throw result;
      else
         return res
            .status(Code.OK)
            .send(new HttpResponse(Code.OK, Status.OK, 'Get detail information user', result));
   } catch (error: unknown) {
      return res
         .status(Code.NOT_FOUND)
         .send(new HttpResponse(Code.NOT_FOUND, Status.NOT_FOUND, error + ' '));
   }
};

export const account_me = async (
   req: Request,
   res: Response,
   next: NextFunction,
): Promise<Response<HttpResponse>> => {
   try {
      const token: TokenType = getToken(req);
      if (isErr(token)) throw token;
      const result: Account_Type = await accountService.account_me(token as string);
      if (isErr(result)) throw result;
      else
         return res
            .status(Code.OK)
            .send(
               new HttpResponse(
                  Code.OK,
                  Status.OK,
                  'information account of this account login',
                  result,
               ),
            );
   } catch (error: unknown) {
      return res
         .status(Code.NOT_FOUND)
         .send(new HttpResponse(Code.NOT_FOUND, Status.NOT_FOUND, error + ' '));
   }
};

export const verify = async (
   req: Request,
   res: Response,
   next: NextFunction,
): Promise<Response<HttpResponse>> => {
   try {
      const { userId } = req.params;
      const result: UpdateResult | Error = await accountService.verify(userId);
      if (result instanceof UpdateResult)
         return res
            .status(Code.CREATED)
            .send(
               new HttpResponse(
                  Code.CREATED,
                  Status.CREATED,
                  'Confirm email successfully',
                  result.raw[0],
               ),
            );
      throw result;
   } catch (error: unknown) {
      return res
         .status(Code.NOT_FOUND)
         .send(new HttpResponse(Code.NOT_FOUND, Status.NOT_FOUND, error + ' '));
   }
};

export const updatePassword = async (
   req: Request,
   res: Response,
   next: NextFunction,
): Promise<Response<HttpResponse>> => {
   try {
      const token: TokenType = getToken(req);
      if (isErr(token)) throw token;
      const { newPassword, oldPassword } = req.body;
      const result: UpdateType = await accountService.updatePassword(
         token as string,
         newPassword,
         oldPassword,
      );
      if (result instanceof UpdateResult)
         res.status(Code.OK).send(
            new HttpResponse(Code.OK, Status.OK, 'Update password successfully', result.raw[0]),
         );

      throw result;
   } catch (error: unknown) {
      return res
         .status(Code.NOT_FOUND)
         .send(new HttpResponse(Code.NOT_FOUND, Status.NOT_FOUND, error + ' '));
   }
};

// register new account
export const register = async (
   req: Request,
   res: Response,
   next: NextFunction,
): Promise<Response<HttpResponse>> => {
   try {
      const body: Register_Interface = req.body;
      const result: Account_Type = await accountService.register(body);
      if (result instanceof Account) {
         return res
            .status(Code.OK)
            .json(new HttpResponse(Code.OK, Status.OK, ' Account successfully registered', result));
      }

      throw result;
   } catch (error) {
      return res
         .status(Code.NOT_FOUND)
         .send(new HttpResponse(Code.NOT_FOUND, Status.NOT_FOUND, error + ' '));
   }
};
