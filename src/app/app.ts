import helmet from 'helmet';
import { Request, Response, NextFunction } from 'express';
import { getErrorMessage } from '../app/utils/err/errorMessage';
const morgan = require('morgan');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const cookieParser = require('cookie-parser');

app.connect(require('./databases/connection'));
// use middleware
app.use(helmet());
app.use(morgan('combined'));
app.use(
    cors({
        credentials: true,
        origin: ['http://localhost:4200'],
    })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
// routers
app.use(require('./routes/index.routes'));

// Error Handling Middleware called
app.use((req: Request, res: Response, next: NextFunction) => {
    const error = new Error('Not found');
    next(error);
});
// error handler middleware
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    res.status(error.status || 500).send({
        error: {
            status: error.status || 500,
            message: getErrorMessage(error) || 'Internal Server Error',
        },
    });
});
module.exports = app;
