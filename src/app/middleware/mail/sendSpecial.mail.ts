import { isErr } from '../../utils/Err/isError';
import { SendEMail } from './sendEmail.mail';
export class sendSpecial {
   private content: string;
   private title: string;
   constructor(recipient: string, subject: string, title: string, content: string) {
      try {
         this.title = title;
         this.content = content;

         const sendEmail = new SendEMail(
            recipient,
            subject,
            `<h1> ${this.title} </h1>
              <p>${this.content}  </p>
         `,
         );

         if (isErr(sendEmail)) {
            throw sendEmail;
         }
      } catch (error) {
         return error;
      }
   }
}
