import { Router } from 'express';
const root_Router = Router();

const account = require('./Account/account.router');
const event = require('./Event/event.router');
const movie = require('./Movie/movie.router');
const order = require('./Order/order.router');
const service = require('./Service/service.router');
const showtime = require('./ShowTime/showTime.router');
const theater = require('./Theater/theater.router');
const voucher = require('./Voucher/voucher.router');
const workingTime = require('./WorkingTime/workingTime.router');

root_Router.use('/api/account', account);
root_Router.use('/api/event', event);
root_Router.use('/api/movie', movie);
root_Router.use('/api/order', order);
root_Router.use('/api/service', service);
root_Router.use('/api/showtime', showtime);
root_Router.use('/api/theater', theater);
root_Router.use('/api/voucher', voucher);
root_Router.use('/api/workingTime', workingTime);

module.exports = root_Router;
