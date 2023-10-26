import * as http from 'http';
import debug from 'debug';
import App from './app';

debug('ts-express:server');
// create port config on env or default 8080
const port = normalizePort(process.env.PORT_DEV || 8080);

//use port
App.set('port', port);

// create server http base on express instance
const server = http.createServer(App);
server.listen(port, () => {
   onlisten(); //
});
// Register event "Error" on web server
server.on('error', onError);
// Check type port invalid or valid
function normalizePort(value: number | string): number | string | boolean {
   let port: number = typeof value === 'string' ? parseInt(value, 10) : value;
   if (isNaN(port)) return value;
   else if (port >= 0) return port;
   else return false;
}

// function handle Error on web server
function onError(error: NodeJS.ErrnoException): void {
   if (error.syscall !== 'listen') throw error;
   let bind = typeof port === 'string' ? 'Pipe' + port : 'Port' + port;
   switch (error.code) {
      case 'EACCES':
         console.error(`${bind} requieres elevated privileges`);
         process.exit(1);
         break;
      case 'EADDRINUSE':
         console.error(`${bind} is already in use`);
         process.exit(1);
         break;
      default:
         throw error;
   }
}

// confirm port or pipe
function onlisten(): void {
   let address = server.address();
   let bind = typeof address === 'string' ? `pipe ${address}` : `port ${address?.port}`;
   debug(`Listen on ${bind}`);
   console.log(`Listen on ${bind}`);
}
