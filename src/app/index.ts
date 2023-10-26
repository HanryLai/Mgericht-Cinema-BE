require('dotenv').config();

import express, { Request, Response } from 'express';
import logger from 'morgan';
import * as bodyParser from 'body-parser';
import cors from 'cors';
import { connect } from './connectDb/connectdb.postgres';
// import { error } from 'console';

class App {
   // ref to Express instance
   public express: express.Application;
   // run configuration methods on the Express instance
   constructor() {
      this.express = express();
      this.middleware();
      this.routes();
      this.connectDb();
   }

   private middleware(): void {
      this.express.use(cors({ origin: 'http://localhost8080' }));
      this.express.use(bodyParser.json());
      this.express.use(bodyParser.urlencoded({ extended: false }));
      this.express.use(logger('dev'));
   }
   // configure API endpoint
   private routes(): void {
      let routes = express.Router();
      routes.get('/api/', (_req: Request, res: Response) => {
         res.json({
            message: 'hello world',
         });
         console.log('test successful');
      });
      console.log('test successfully');
   }

   private connectDb(): void {
      connect
         .initialize()
         .then(() => console.log('Connect postgres successfully'))
         .catch((_error) => console.log(`connect postgres fail : ${_error}`));
   }
}
export default new App().express;
