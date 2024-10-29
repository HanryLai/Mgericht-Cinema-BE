import { Code } from '../../enum/Code.enum';
import { Status } from '../../enum/Status.enum';

export class HttpResponse {
   private statusCode: Code;
   private httpStatus: Status;
   private message: String;
   private data?: {};
   private timestamp: string;

   constructor(statusCode: Code, httpStatus: Status, message: String, data?: {}) {
      (this.statusCode = statusCode), (this.httpStatus = httpStatus);
      this.message = message;
      this.data = data;
      this.timestamp = new Date().toLocaleString();
   }
}
