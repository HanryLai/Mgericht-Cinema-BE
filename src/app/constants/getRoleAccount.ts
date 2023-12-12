import { resolve } from 'path';
import { ConnectDb } from '../connectDb/connectdb.postgres';
import { Account, Admin, Employee } from '../models';
import { promises } from 'dns';

export class getRoleAccount {
   id_Account: string;
   role: Promise<string>;
   constructor(id: string) {
      this.id_Account = id;
      this.role = this.setRole().then((resolve) => {
         console.log(resolve + ' hello resolve');
         return resolve;
      });
   }

   private async setRole(): Promise<string> {
      let role: string = '';
      const isAdmin: Admin | null = await ConnectDb.getConnect()
         .getRepository(Admin)
         .createQueryBuilder()
         .where('Admin.id_Account =:id', { id: this.id_Account })
         .getOne();
      if (isAdmin !== null) role = 'admin';
      else {
         const isEmployee: Employee | null = await ConnectDb.getConnect()
            .getRepository(Employee)
            .createQueryBuilder()
            .where('Employee.id_Account =:id', { id: this.id_Account })
            .getOne();
         if (isEmployee !== null) role = 'employee';
         else role = 'customer';
      }
      return role;
   }

   public getRole(): Promise<string> {
      return this.role;
   }
}
