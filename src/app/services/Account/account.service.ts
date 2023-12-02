import { hash, compareSync, hashSync } from 'bcrypt';
import { ValidationError, validate } from 'class-validator';
import { ConnectDb } from '../../connectDb/connectdb.postgres';
import { Account, Detail_Information, Detail_Information_Interface } from '../../models';
import { Role_Account } from '../../models/Account/account.model';
import { Admin } from '../../models/Account_Role/admin.model';
import { Customer } from '../../models/Account_Role/customer.model';
import { Employee } from '../../models/Account_Role/employee.model';
import { GenerateToken } from '../../middleware/jwt/generateToken';
import { decode } from 'jsonwebtoken';
import { jwt } from '../../middleware/jwt/jwt.interface';
import { InsertResult, ObjectLiteral, UpdateResult } from 'typeorm';
import { sendLink } from '../../middleware/mail/sendLink.mail';
import { Register_Interface } from '../../interface/register.interface';
import { isVerify } from '../../utils/verify/isVerify';
import { sendOTP } from '../../middleware/mail/sendOTP.mail';
import * as cron from 'node-cron';
import { isErr } from '../../utils/Err/isError';

export type AccountAndDetail = Account & Detail_Information;

export const login = async (body: Account): Promise<UpdateResult | Error> => {
   try {
      const account = body;
      const foundAccount = await ConnectDb.getConnect()
         .getRepository(Account)
         .createQueryBuilder('account')
         .where('account.username = :username', { username: account.username })
         .getOne();
      if (foundAccount === null)
         throw new Error('Incorrect username or password. Please try again.');
      isVerify(foundAccount);
      const comparePassword = compareSync(account.password, foundAccount?.password as string);
      console.log(comparePassword);
      if (!comparePassword) throw new Error('Incorrect username or password. Please try again.');
      // generate token
      const jwt = new GenerateToken(foundAccount as unknown as Account);
      const token = jwt.token;
      const updateToken = await ConnectDb.getConnect()
         .createQueryBuilder()
         .update(Account)
         .set({
            verification_Token: token,
            last_Login: new Date(Date.now()),
         })
         .where('id = :id', { id: foundAccount?.id })
         .returning('*')
         .execute();
      if (updateToken instanceof Error) {
         throw new Error('update token failure');
      }

      return updateToken;
   } catch (error) {
      return error;
   }
};

export const logout = async (token: string): Promise<UpdateResult | Error> => {
   try {
      const foundAccount = await ConnectDb.getConnect()
         .getRepository(Account)
         .createQueryBuilder('account')
         .where('account.verification_Token = :token', { token: token })
         .getOne();
      if (!foundAccount) {
         throw new Error("you're not login");
      }

      const updaterResult = await ConnectDb.getConnect()
         .createQueryBuilder()
         .update(Account)
         .set({
            verification_Token: null,
         })
         .where('verification_Token = :token', { token: token })
         .execute();

      if (!(updaterResult.affected != undefined && updaterResult.affected != 0)) {
         throw new Error('Error update token null');
      }
      return updaterResult;
   } catch (error: unknown) {
      return error as Error;
   }
};
//
export const detail_Information = async (
   token: string,
): Promise<Detail_Information_Interface | Error> => {
   try {
      const isValidToken = await ConnectDb.getConnect()
         .getRepository(Account)
         .createQueryBuilder('acc')
         .where('acc.verification_Token = :token', { token: token })
         .getOne();
      if (!isValidToken) throw new Error("you're not login!!! plz login before continuous");

      const account = decode(token) as jwt;
      const idAccount = account.id;

      const result = await ConnectDb.getConnect()
         .getRepository(Detail_Information)
         .createQueryBuilder('info')
         .where((qb) => {
            const subQuery = qb
               .subQuery()
               .select('account.id_Detail_Information')
               .from(Account, 'account')
               .where('account.id = :id')
               .getQuery();
            return 'info.id IN ' + subQuery;
         })
         .setParameter('id', idAccount)
         .getOne();

      if (result === null) {
         throw new Error('not exist detail_information !!! plz create new account');
      }
      return result;
   } catch (error) {
      return error;
   }
};

export const account_me = async (token: string): Promise<Account | Error> => {
   try {
      const isValidToken = await ConnectDb.getConnect()
         .getRepository(Account)
         .createQueryBuilder('acc')
         .where('acc.verification_Token = :token', { token: token })
         .getOne();
      if (isValidToken === null) throw new Error("you're not login!!! plz login before continuous");
      const payload = decode(token) as jwt;
      const idAccount = payload.id;
      const account: Account | null = await ConnectDb.getConnect()
         .getRepository(Account)
         .createQueryBuilder('account')
         .where('account.id = :id', { id: idAccount })
         .getOne();
      if (account == null) {
         throw new Error('not exist this information account');
      } else {
         return account;
      }
   } catch (error: unknown) {
      return error as Error;
   }
};

export const verify = async (userId: string): Promise<UpdateResult | Error> => {
   try {
      const user: Account | null = await ConnectDb.getConnect()
         .getRepository(Account)
         .createQueryBuilder('account')
         .select()
         .where('id = :userId', { userId: userId })
         .getOne();
      if (!user) throw new Error('not exist this account');
      if (user.is_Verified === true) throw new Error('Account was verified');

      if (user.create_At.getTime() + 10 * 60000 < Date.now()) {
         const deleteResult = await ConnectDb.getConnect()
            .getRepository(Account)
            .createQueryBuilder('account')
            .delete()
            .from(Account)
            .where('id = :userid', { id: userId })
            .execute();
         throw new Error('Link confirm expired. try again !!!');
      }

      await ConnectDb.getConnect()
         .createQueryBuilder()
         .insert()
         .into(Customer)
         .values({
            id_Account: user.id,
         })
         .execute();

      const result: UpdateResult = await ConnectDb.getConnect()
         .getRepository(Account)
         .createQueryBuilder('account')
         .update()
         .set({
            is_Verified: true,
         })
         .where('id = :userId', { userId: userId })
         .execute();
      return result;
   } catch (error: unknown) {
      return error as Error;
   }
};

export const updatePassword = async (
   token: string,
   newPass: string,
   oldPass: string,
): Promise<UpdateResult | Error> => {
   try {
      if (token === null) throw new Error("you're must login");
      const payload = decode(token) as jwt;
      if (payload === null) throw new Error('token wrong format or invalid');
      const idAccount = payload.id;
      const account = await ConnectDb.getConnect()
         .getRepository(Account)
         .createQueryBuilder('account')
         .where('account.id=:id', {
            id: idAccount,
         })
         .getOne();
      if (account === null || account.verification_Token === null)
         throw new Error("you're not login");

      const checkpassword = compareSync(oldPass, account.password);
      if (!checkpassword)
         throw new Error(
            'Try again !!! The confirm password not the same as the previous password',
         );
      if (account.verification_Token != token) throw new Error("you're not own");
      const hashNewPass = await hash(newPass, parseInt(process.env.BCRYPT_SALT as string));
      const updateAccount = await ConnectDb.getConnect()
         .createQueryBuilder()
         .update(Account)
         .set({
            password: hashNewPass,
            verification_Token: null,
         })
         .where('id = :id', { id: idAccount })
         .returning('*')
         .execute();
      if (updateAccount.affected === undefined || updateAccount.affected < 0)
         throw new Error('update new password fail');
      return updateAccount;
   } catch (error) {
      return error;
   }
};

export const register = async (body: Register_Interface): Promise<Account | Error> => {
   try {
      if (body.tmp_Role !== Role_Account.CUSTOMER) throw new Error("you're not permission");
      body.password = await hash(
         body.password as string,
         parseInt(process.env.BCRYPT_SALT as string),
      );

      let foundAccount: Account | null = await ConnectDb.getConnect()
         .getRepository(Account)
         .createQueryBuilder('account')
         .where('account.username = :username', { username: body.username })
         .getOne();
      if (foundAccount) {
         throw new Error('username existed');
      }

      let account: Account = await ConnectDb.getConnect().getRepository(Account).create(body);
      const information_tmp: Detail_Information = await ConnectDb.getConnect()
         .getRepository(Detail_Information)
         .create({
            email: body.email,
         });
      if (information_tmp instanceof Error) throw information_tmp;
      const information_Created: Detail_Information = await ConnectDb.getConnect()
         .getRepository(Detail_Information)
         .save(information_tmp);
      const error: ValidationError[] = await validate(account);
      if (error.length > 0) {
         throw error;
      }
      account.id_Detail_Information = information_Created;
      const result: Account = await ConnectDb.getConnect().getRepository(Account).save(account);
      new sendLink(
         body.email,
         'Email CME CINEMA confirm register',
         result.id.toString(),
         `${process.env.HOST}${process.env.PORT_DEV}/api/account/verify`,
      );

      // set cron schedule delete this Account after 10 minutes
      const taskCheck = cron.schedule(
         '* */10 * * * *',
         async () => {
            if (result.is_Verified === false) {
               await ConnectDb.getConnect()
                  .createQueryBuilder()
                  .delete()
                  .from(Account)
                  .where('id  = :idAccount', { idAccount: result.id })
                  .execute();

               await ConnectDb.getConnect()
                  .createQueryBuilder()
                  .delete()
                  .from(Detail_Information)
                  .where('id = :idDetai', { idDetai: result.id_Detail_Information })
                  .execute();
               console.log('DELETE ' + result.id);
            }
            stopTask();
         },
         {
            scheduled: true,
         },
      );

      // cannot stop in this schedule => using settimeOUt (API browser)
      function stopTask() {
         // stop task
         setTimeout(() => {
            taskCheck.stop();
         }, 1000);
      }

      return result;
   } catch (error: unknown) {
      return error as Error;
   }
};

export const requestForgetPassword = async (email: string): Promise<Boolean | Error> => {
   try {
      const detail_Information: Detail_Information | null = await ConnectDb.getConnect()
         .getRepository(Detail_Information)
         .createQueryBuilder('detaiInfor')
         .select()
         .where('email = :email', { email: email })
         .getOne();
      if (detail_Information === null) throw new Error('not exist this account');
      const send: sendOTP = new sendOTP(
         detail_Information.email,
         'Confirm forget password CME-CINEMA',
      );

      const account: UpdateResult = await ConnectDb.getConnect()
         .getRepository(Account)
         .createQueryBuilder()
         .update()
         .set({
            verification_Token: send.getOTP(),
         })
         .where('id_Detail_Information = :idDetail', { idDetail: detail_Information.id })
         .execute();

      console.log(send.getOTP);
      return true;
   } catch (error: unknown) {
      return error as Error;
   }
};

export const verifyForgetPassword = async (email: string, OTP: string): Promise<Error | string> => {
   try {
      const found_Account: ObjectLiteral | null = await ConnectDb.getConnect()
         .createQueryBuilder('Account', 'acc')
         .innerJoinAndSelect('acc.id_Detail_Information', 'Detail_Information')
         .where('acc.verification_Token = :otp AND Detail_Information.email = :email', {
            otp: OTP,
            email: email,
         })
         .getOne();

      if (found_Account === null) throw new Error('OTP invail please try again or email');
      const hashEmail = hashSync(
         found_Account.id_Detail_Information.email,
         parseInt(process.env.BCRYPT_SALT as string),
      );
      await ConnectDb.getConnect()

         .createQueryBuilder()
         .update(Account)
         .set({
            verification_Token: hashEmail,
         })
         .where('id = :id', { id: found_Account.id })
         .execute();
      return hashEmail;
   } catch (error: unknown) {
      return error as Error;
   }
};

export const forgetPassword = async (
   hashEmail: string,
   newPass: string,
): Promise<UpdateResult | Error> => {
   try {
      const found_Account: ObjectLiteral | null = await ConnectDb.getConnect()
         .createQueryBuilder('Account', 'acc')
         .innerJoinAndSelect('acc.id_Detail_Information', 'Detail_Information')
         .where('acc.verification_Token=:verify', { verify: hashEmail })
         .getOne();
      if (found_Account === null) throw new Error('not exist this account');

      const result: UpdateResult | Error = await ConnectDb.getConnect()
         .getRepository(Account)
         .createQueryBuilder()
         .update()
         .set({
            password: await hash(newPass, parseInt(process.env.BCRYPT_SALT as string)),
            verification_Token: '',
         })
         .execute();
      if (isErr(Account)) throw new Error('Update password errror');
      return result;
   } catch (error: unknown) {
      return error as Error;
   }
};
