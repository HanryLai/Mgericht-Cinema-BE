import { isErr } from '../../utils/Err/isError';
import { SendEMail } from './sendEmail.mail';
export class sendOTP {
   private OTP: string;
   constructor(recipient: string, subject: string) {
      try {
         this.OTP = this.createOTP();
         const sendEmail = new SendEMail(
            recipient,
            subject,
            `<h1> OTP confirm email </h1>
              <p>OTP CME-Cinema for your account is ${this.OTP}  </p>
         `,
         );
         console.log(' hashCode =>>>' + this.OTP);

         if (isErr(sendEmail)) {
            throw sendEmail;
         }
      } catch (error) {
         return error;
      }
   }

   private createOTP(): string {
      const OTP = Math.floor(Math.random() * 100000) + '';

      return OTP;
   }

   public getOTP(): string {
      return this.OTP;
   }
}
