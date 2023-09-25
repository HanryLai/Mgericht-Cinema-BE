require('dotenv').config();

const express = require('express');
import { Request, Response } from "express";

class App {
   public express: Express.Application;

   constructor() {
      this.express = express();
      this.middleware();
      this.routes();
   }

   private middleware() {}

   private routes(): void {
          let router = express.Router();
          router.get('/', (req: Request, res: Response) => {
               res.json({
                 message: 'Hello World!'
               });
             });
   }
}
export default new App().express;