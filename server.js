const express = require('express'); // importing a CommonJS module
const helmet = require('helmet');
const hubsRouter = require('./hubs/hubs-router.js');
const morgan = require('morgan');
const server = express();

//function
function logger(req, res, next) {
   const time = new Date().toLocaleTimeString();
   const date = new Date().toLocaleDateString();
   console.log(
      `${req.method} Request | http://localhost:4000${req.url} | ${date} , ${time}`
   );
   next();
}
function gateKeeper(req, res, next) {
   // data can come in the body, url parameters, query string, headers
   // new way of reading data sent by the client
   const password = req.headers.password || '';

   if (password.toLowerCase() === 'mellon') {
      next();
   } else {
      res.status(401).json({ message: 'enter the password.' });
   }
}

//global middleWare
server.use('/api/hubs', hubsRouter);
server.use(helmet());
server.use(express.json());
server.use(logger);
server.use(morgan('dev'));
server.use(gateKeeper);

server.get('/', (req, res) => {
   const nameInsert = req.name ? ` ${req.name}` : '';

   res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome${nameInsert} to the Lambda Hubs API</p>
    `);
});

module.exports = server;
