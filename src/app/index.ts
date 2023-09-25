require('dotenv').config();

import express, { Request, Response } from 'express';
import logger from 'morgan';
import * as bodyParser from 'body-parser';
import cors from 'cors';

class App {
   // ref to Express instance
   public express: express.Application;
   // run configuration methods on the Express instance
   constructor() {
      this.express = express();
      this.middleware();
      this.routes();
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
      routes.get('/api/', (req: Request, res: Response) => {
         res.json({
            message: 'hello world',
         });
         console.log('test successful');
      });
      console.log('test successful');
   }
}
export default new App().express;
