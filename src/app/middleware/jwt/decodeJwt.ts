import { JwtPayload, decode } from 'jsonwebtoken';
import { jwt } from './jwt.interface';

export const decodeJwt = (token: string): jwt => {
   const jwtPayload: JwtPayload | null | string = decode(token);
   return jwtPayload as jwt;
};
