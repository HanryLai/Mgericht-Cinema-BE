import { Request } from 'express';

export const getToken = (req: Request): String | Error => {
   if (req.headers.authorization?.split(' ')[1] != null) {
      return req.headers.authorization?.split(' ')[1];
   } else {
      return new Error('not have bearer token');
   }
};
