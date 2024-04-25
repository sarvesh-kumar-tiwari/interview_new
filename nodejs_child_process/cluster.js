const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;
const express = require('express');

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
   cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
  });
} else {
  const app = express();

  app.get('/', (req, res) => {
    res.send('Hello from worker ' + cluster.worker.id);
  });

  const server = http.createServer(app);

  server.listen(8000, () => {
    console.log(`Worker ${process.pid} started`);
  });
}
