import { NextFunction, Request, Response } from 'express';
import * as accountService from '../../services/Account/account.service';
import { isErr } from '../../utils/Err/isError';
import { getToken } from '../../middleware/jwt/jwt';
import { HttpResponse } from '../../domain/http/response';
import { Account, Admin, Detail_Information, Detail_Information_Interface } from '../../models';
import { Code } from '../../enum/Code.enum';
import { Status } from '../../enum/Status.enum';
import { InsertResult, ObjectId, ObjectLiteral, UpdateResult } from 'typeorm';
import { Register_Interface } from '../../interface/register.interface';
import { decodeJwt } from '../../middleware/jwt/decodeJwt';
import { jwt } from '../../middleware/jwt/jwt.interface';
import { decode } from 'jsonwebtoken';

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
            .send(new HttpResponse(Code.OK, Status.OK, 'Log out successfully', result.raw[0] + ''));
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
         return res
            .status(Code.OK)
            .send(
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
            .json(
               new HttpResponse(
                  Code.OK,
                  Status.OK,
                  ' You have ten minutes to confirm and final register email',
                  result,
               ),
            );
      }

      throw result;
   } catch (error) {
      return res
         .status(Code.NOT_FOUND)
         .send(new HttpResponse(Code.NOT_FOUND, Status.NOT_FOUND, error + ' '));
   }
};

export const requestForgetPassword = async (
   req: Request,
   res: Response,
   next: NextFunction,
): Promise<Response<HttpResponse>> => {
   try {
      const { email } = req.body;

      if ((email as string).trim() === '') throw new Error('email empty');
      const result: Boolean | Error = await accountService.requestForgetPassword(email);
      if (isErr(result)) throw result;
      return res
         .status(Code.OK)
         .send(new HttpResponse(Code.OK, Status.OK, "confirm you're owner of this email"));
   } catch (error) {
      return res
         .status(Code.BAD_REQUEST)
         .send(new HttpResponse(Code.BAD_REQUEST, Status.BAD_REQUEST, error + ' '));
   }
};

export const verifyForgetPassword = async (
   req: Request,
   res: Response,
   next: NextFunction,
): Promise<Response<HttpResponse>> => {
   try {
      const { email, OTP } = req.body;
      const result: Error | string = await accountService.verifyForgetPassword(email, OTP);
      if (isErr(result)) throw result;
      return res
         .status(Code.CREATED)
         .send(new HttpResponse(Code.CREATED, Status.CREATED, 'confirm success', result));
   } catch (error: unknown) {
      return res
         .status(Code.BAD_REQUEST)
         .send(
            new HttpResponse(
               Code.BAD_REQUEST,
               Status.BAD_REQUEST,
               'Error :' + error,
               error as Error,
            ),
         );
   }
};

export const forgetPassword = async (
   req: Request,
   res: Response,
   next: NextFunction,
): Promise<Response<HttpResponse>> => {
   try {
      const hashEmail: TokenType = getToken(req);
      if (isErr(hashEmail)) throw hashEmail;
      const result: UpdateType = await accountService.forgetPassword(
         hashEmail as string,
         req.body.newPassword,
      );
      if (isErr(result)) throw result;
      return res
         .status(Code.OK)
         .send(
            new HttpResponse(
               Code.OK,
               Status.OK,
               'update password successfully !!! you can log in with new password',
            ),
         );
   } catch (error: unknown) {
      return res
         .status(Code.NOT_FOUND)
         .send(new HttpResponse(Code.NOT_FOUND, Status.NOT_FOUND, error + ' '));
   }
};

export const updateDetailInformation = async (
   req: Request,
   res: Response,
   next: NextFunction,
): Promise<Response<HttpResponse>> => {
   try {
      const detail: Detail_Information = req.body;
      const token: string | Error = getToken(req);
      if (token instanceof Error) throw token;
      const dataDecode: jwt = decodeJwt(token);
      const id_Account: string = dataDecode.id;

      const result: UpdateType = await accountService.updateDetailInformation(detail, id_Account);
      if (isErr(result)) throw result;
      return res
         .status(Code.OK)
         .send(
            new HttpResponse(Code.OK, Status.OK, 'Update detail information successfully', result),
         );
   } catch (error) {
      return res
         .status(Code.BAD_REQUEST)
         .send(new HttpResponse(Code.BAD_REQUEST, Status.BAD_REQUEST, error + ''));
   }
};

// ADMIN permissions
export const loginAdmin = async (
   req: Request,
   res: Response,
   next: NextFunction,
): Promise<Response<HttpResponse>> => {
   try {
      const account: Account = req.body;
      let result: UpdateType = await accountService.loginAdmin(account);

      if (isErr(result)) throw result;
      return res
         .status(Code.OK)
         .send(new HttpResponse(Code.OK, Status.OK, 'Login for admin successfully', result));
   } catch (error: unknown) {
      return res
         .status(Code.NOT_FOUND)
         .send(new HttpResponse(Code.NOT_FOUND, Status.NOT_FOUND, error + ' '));
   }
};

export const createFirstAdmin = async (
   req: Request,
   res: Response,
   next: NextFunction,
): Promise<Response<HttpResponse>> => {
   try {
      const result: ObjectLiteral | Error = await accountService.registerFirstAdmin(req.body);
      if (isErr(result)) throw result;
      return res
         .status(Code.OK)
         .send(
            new HttpResponse(
               Code.OK,
               Status.OK,
               'register for admin or employee successfully',
               result,
            ),
         );
   } catch (error) {
      return res
         .status(Code.BAD_REQUEST)
         .send(new HttpResponse(Code.BAD_REQUEST, Status.BAD_REQUEST, error + ''));
   }
};

export const registerForAdmin = async (
   req: Request,
   res: Response,
   next: NextFunction,
): Promise<Response<HttpResponse>> => {
   try {
      const token = getToken(req);
      if (isErr(token)) throw token;
      const id_Admin: string = (decode(token as string) as jwt).id;
      const result: Account | Error = await accountService.registerForAdmin(id_Admin, req.body);
      console.log(result);
      if (isErr(result)) throw result;
      return res
         .status(Code.OK)
         .send(
            new HttpResponse(
               Code.OK,
               Status.OK,
               'register for admin or employee successfully',
               result,
            ),
         );
   } catch (error) {
      return res
         .status(Code.BAD_REQUEST)
         .send(new HttpResponse(Code.BAD_REQUEST, Status.BAD_REQUEST, error + ''));
   }
};
