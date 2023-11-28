import { hash, compareSync } from 'bcrypt';
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
import { InsertResult, UpdateResult } from 'typeorm';
import { sendOTP } from '../../middleware/mail/sendOTP.mail';
import { Register_Interface } from '../../interface/register.interface';
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

export const logout = async (token: string) => {
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
      return { ...foundAccount };
   } catch (error) {
      return error;
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
      if (account === null) throw new Error("you're not login");
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
         .set({ password: hashNewPass })
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
      if (body.tmp_Role === Role_Account.ADMIN || body.tmp_Role === Role_Account.EMPLOYEE)
         throw new Error("you're not permission");
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
      new sendOTP(body.email, 'Email CME CINEMA confirm register', result.id.toString());
      return result;
   } catch (error: unknown) {
      return error as Error;
   }
};
