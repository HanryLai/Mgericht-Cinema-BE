require('dotenv').config();

import express, { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import logger from 'morgan';
var bodyParser = require('body-parser');
import cors from 'cors';
import { ConnectDb } from './connectDb/connectdb.postgres';
import { HttpResponse } from './domain/http/response';
import { Code } from '../app/enum/Code.enum';
import { Status } from '../app/enum/Status.enum';

class App {
   // ref to Express instance
   public express: express.Application;

   // run configuration methods on the Express instance
   constructor() {
      this.express = express();
      this.middleware();
      this.connectDb();
      this.routes();
      this.handleError();
   }

   private middleware(): void {
      this.express.use(cors({ origin: 'http://localhost8080' }));
      this.express.use(bodyParser.urlencoded({ extended: false }));
      this.express.use(bodyParser.json());
      this.express.use(logger('dev'));
   }
   // configure RESTFUL API
   private routes(): void {
      this.express.use(require('./routers'));
   }
   // config dbs and connect to dbs
   private connectDb(): void {
      new ConnectDb();
      ConnectDb.setConnect();
   }

   private handleError(): void {
      function handleError(
         err: ErrorRequestHandler,
         req: Request,
         res: Response,
         next: NextFunction,
      ): Response<HttpResponse> {
         return res
            .status(Code.BAD_REQUEST)
            .send(
               new HttpResponse(Code.BAD_REQUEST, Status.BAD_REQUEST, err + ' for handling error'),
            );
      }
      this.express.use(handleError);
   }
}
export default new App().express;
