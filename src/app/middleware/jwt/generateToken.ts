import * as jwt from 'jsonwebtoken';
import { getRoleAccount } from '../../constants/getRoleAccount';

export class GenerateToken {
   id: string;
   token: Promise<string>;
   constructor(id: string) {
      this.id = id;
      this.token = this.general();
   }

   private async setUpData(): Promise<string> {
      const classRole = new getRoleAccount(this.id);
      const rolePromise: string = await classRole.getRole();
      return rolePromise;
   }

   private async general(): Promise<string> {
      const token = jwt.sign(
         {
            id: this.id,
            role: await this.setUpData(),
         },
         process.env.JWT_TOKEN as string,
         {
            expiresIn: '1d',
         },
      );

      return token;
   }
}
