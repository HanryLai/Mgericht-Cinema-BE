import * as express from 'express';
import helmet from 'helmet';
import * as compression from 'compression';
import * as morgan from 'morgan';
import * as cors from 'cors';
import router from './routes';
const app = express();
// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan('dev'));
app.use(compression());
app.use(cors());
// db
require('./databases/init.db');
//route
app.use(router);

export default app;
