import { Role_Account } from '../models/Account/account.model';

export interface Register_Interface {
   username: string;
   password: string;
   email: string;
   phone: string;
   tmp_Role: Role_Account;
}
