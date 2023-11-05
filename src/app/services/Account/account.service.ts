import { compare, hash } from 'bcrypt';
import { validate } from 'class-validator';
import { connect } from '../../connectDb/connectdb.postgres';
import { Account } from '../../models';
import { compareSync } from 'bcrypt';

export const register = async (body: Account) => {
   try {
      body.password = await hash(
         body.password as string,
         parseInt(process.env.BCRYPT_SALT as unknown as string),
      );

      const account = await connect.getRepository(Account).create(body);
      const error = await validate(account);
      if (error.length > 0) {
         throw error;
      }
      const result = await connect.getRepository(Account).save(account);
      return result;
   } catch (error) {
      return error;
   }
};

export const login = async (body: Account) => {
   try {
      const account = body;
      const foundAccount = await connect
         .getRepository(Account)
         .createQueryBuilder('account')
         .where('account.username = :username', { username: account.username })
         .getOne();
      const comparePassword = compareSync(account.password, foundAccount?.password as string);
      if (!comparePassword) throw new Error('Wrong username or password ');
      return foundAccount;
   } catch (error) {
      return error;
   }
};
