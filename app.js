const express = require("express");
const todoRoutes = require("./routes");
const client = require('prom-client');

const app = express();
app.use(express.json());
app.use("/api/todos", todoRoutes);

const requestCount = new client.Counter({
  name: 'http_requests_total',
  help: 'Total HTTP requests',
});

app.use((req, res, next) => {
  requestCount.inc();
  next();
});

app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});

module.exports = app;
