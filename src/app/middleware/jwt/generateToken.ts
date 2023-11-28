import * as jwt from 'jsonwebtoken';

interface data {
   id: any;
}

export class GenerateToken {
   id: string;
   token: string;
   constructor(data: data) {
      this.id = data.id;
      this.token = this.general();
   }

   private general(): string {
      const token = jwt.sign(
         {
            id: this.id,
         },
         process.env.JWT_TOKEN as string,
         {
            expiresIn: '1d',
         },
      );
      return token;
   }
}
