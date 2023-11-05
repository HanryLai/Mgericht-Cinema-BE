import { DataSource } from 'typeorm';

import * as Model_Postgres from '../models';

export const connect = new DataSource({
   type: 'postgres',
   host: 'localhost',
   port: 5432,
   username: 'postgres',
   password: process.env.PASSWORD_POSTGRES,
   database: 'Mgerich_Cinema',
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
   ],
   synchronize: true,
   // logging: true,
});
