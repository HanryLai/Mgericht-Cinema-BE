import * as jwt from 'jsonwebtoken';
<<<<<<< HEAD

export const generateToken = (id: string, role: string) => {
    const token = jwt.sign({ refreshToken: id, role: role }, process.env.JWT_SECRET as string, {
        expiresIn: '30m',
    });
    return token;
};
=======
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
>>>>>>> 33b58a5b0cd9a73d86cda2649a784befd77668cb
