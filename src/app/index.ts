require('dotenv').config();

const express = require('express');


class App {
   public express: Express.Application;

   constructor() {
      this.express = express();
      this.middleware();
      this.routes();
   }

   private middleware(): void {}

   private routes(): void {
         
            
   }
}
export default new App().express;