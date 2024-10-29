import { Transporter, createTransport } from 'nodemailer';

export class SendEMail {
   private transporter: Transporter;
   private receive: {};
   constructor(recipient: string, subject: string, html: string) {
      try {
         // config transport => info account to sendEmail
         this.configTransport()
            .then((transporter) => {
               this.transporter = transporter;
               // config account recipient and content. Get object informatio sent
               this.configRecipient(recipient, subject, html)
                  .then((receive) => {
                     this.receive = receive;
                  })
                  .catch((error) => {
                     throw error;
                  });
            })
            .catch((error) => {
               throw error;
            });
      } catch (error) {
         return error;
      }
   }

   private async configTransport(): Promise<Transporter> {
      return await createTransport({
         host: 'smtp.gmail.com',
         port: 465,
         secure: true,
         auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD_EMAIL,
         },
      });
   }

   private async configRecipient(
      recipient: string,
      subject: string,
      html: string,
   ): Promise<Object> {
      return await this.transporter.sendMail({
         from: `${process.env.CINEMA_NAME} <${process.env.EMAIL}>`,
         to: recipient,
         subject: subject,
         html: html,
      });
   }

   private getContentSend() {
      return this.receive;
   }
}
