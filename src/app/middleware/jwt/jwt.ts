import { Request } from 'express';
import { jwt } from './jwt.interface';
import { Jwt, JwtPayload, decode, verify } from 'jsonwebtoken';
export const getToken = (req: Request): string | Error => {
   const token: string | null | undefined = req.headers.authorization?.split(' ')[1];

   if (token != null && token != undefined) {
      const payload = verify(token, process.env.JWT_TOKEN as string) as JwtPayload; // using decode will error
      if (payload.exp !== undefined && payload.exp > Date.now() / 1000)
         throw new Error('Token expired');
      return token;
   } else {
      return new Error('not have bearer token');
   }
};
