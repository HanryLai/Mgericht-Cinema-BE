import { Account } from '../../models';

export const isVerify = (account: Account) => {
   if (account.is_Verified === false) {
      throw new Error('You must verify account before login ');
   }
};
