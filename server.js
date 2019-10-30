const express = require('express'); // importing a CommonJS module
const helmet = require('helmet');
const hubsRouter = require('./hubs/hubs-router.js');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(logger);
server.use('/api/hubs', hubsRouter);

function logger(req, res, next) {
   const time = new Date().toLocaleTimeString();
   const date = new Date().toLocaleDateString();
   console.log(
      `${req.method} Request | http://localhost:4000${req.url} | ${date} , ${time}`
   );
   next();
}

server.get('/', (req, res) => {
   const nameInsert = req.name ? ` ${req.name}` : '';

   res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome${nameInsert} to the Lambda Hubs API</p>
    `);
});

module.exports = server;
