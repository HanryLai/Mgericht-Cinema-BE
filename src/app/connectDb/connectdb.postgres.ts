import { DataSource } from 'typeorm';

import * as Model_Postgres from '../models';

// export const connect =
export class ConnectDb {
   private static connect: DataSource;
   constructor() {
      ConnectDb.connect = new DataSource({
         type: 'postgres',
         host: process.env.DBS_HOST,
         port: parseInt(process.env.DBS_PORT as string),
         username: process.env.DBS_USERNAME,
         password: process.env.PASSWORD_POSTGRES,
         database: process.env.DBS_NAME,
         entities: [
            Model_Postgres.Address,
            Model_Postgres.Theater,
            Model_Postgres.Screen,
            Model_Postgres.TypeScreen,
            Model_Postgres.Detail_Information,
            Model_Postgres.Event,
            Model_Postgres.Movie,
            Model_Postgres.Order,
            Model_Postgres.OrderDetailService,
            Model_Postgres.Review,
            Model_Postgres.ScheduleWorking,
            Model_Postgres.Screen,
            Model_Postgres.Screen,
            Model_Postgres.Seat,
            Model_Postgres.Service,
            Model_Postgres.ShowTime,
            Model_Postgres.Theater,
            Model_Postgres.TimeSheet,
            Model_Postgres.TypeScreen,
            Model_Postgres.TypeSeat,
            Model_Postgres.Voucher,
            Model_Postgres.WorkingTime,
            Model_Postgres.Account,
            Model_Postgres.Admin,
            Model_Postgres.Customer,
            Model_Postgres.Employee,
         ],
         synchronize: true,
         // logging: true,
      });
   }

   public static setConnect(): void {
      this.connect
         .initialize()
         .then(() => console.log('Connect postgres successfully'))
         .catch((_error) => console.log(`connect postgres fail : ${_error}`));
   }

   public static getConnect(): DataSource {
      return this.connect;
   }
}
