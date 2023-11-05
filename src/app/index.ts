require('dotenv').config();

import express from 'express';
import logger from 'morgan';
var bodyParser = require('body-parser');
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
      this.connectDb();
      this.routes();
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

   private connectDb(): void {
      connect
         .initialize()
         .then(() => console.log('Connect postgres successfully'))
         .catch((_error) => console.log(`connect postgres fail : ${_error}`));
   }
}
export default new App().express;
