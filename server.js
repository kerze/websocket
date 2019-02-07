const socketIo = require('socket.io');
const express = require('express');
const http = require('http');
const port = process.env.PORT || 8001;
const app = express();
const router = express.Router();

let amount = 400;
const replenishes = {
  replenishes: [1, 2, 5, 10, 20, 25, 50, 100, 200, 500, 1000],
  purse: 1234567890,
};
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

router.get('/replenishes', (req, res) => {
  res.send(replenishes).status(200);
});
app.use(router);

const server = http.createServer(app);

const io = socketIo(server);
io.on('connection', client => {
  client.emit('amount', amount);

  console.log('client is subscribing to changing amount');
  client.on('change', text => {
    amount = text;
    io.emit('amount', amount);
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));
