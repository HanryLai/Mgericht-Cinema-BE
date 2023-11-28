import { isErr } from '../../constants/Err/isError';
import { SendEMail } from './sendEmail.mail';
import { hashSync, compareSync } from 'bcrypt';
import { v4 } from 'uuid';
export class sendOTP {
   private hashID: string;
   constructor(recipient: string, subject: string, userId: string) {
      try {
         this.hashID = this.createOTP(userId);
         const sendEmail = new SendEMail(
            recipient,
            subject,
            `<h1> Link confirm email  </h1>
              <p> you must link <a href=${process.env.HOST}${process.env.PORT_DEV}/api/account/verify/${userId}&&${this.hashID}>here</a> to confirm email </p>
         `,
         );
         console.log(userId + ' hashCode =>>>' + this.hashID);

         if (isErr(sendEmail)) {
            throw sendEmail;
         }
      } catch (error) {
         return error;
      }
   }

   private createOTP(userID: string): string {
      // const hashID = hashSync(userID, parseInt(process.env.BCRYPT_SALT as string));
      const hashID = v4() + userID;
      return hashID;
   }

   public getOTP(): string {
      return this.hashID;
   }
}
