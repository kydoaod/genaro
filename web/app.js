"use strict"

require("./config/config")
require("./services/db.service")

const express = require('express');
const fs = require('fs');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const httpServer = require('http');
const cookieParser = require('cookie-parser');

const handleErrors = require('./middlewares/handle-errors.middleware');
const cors = require('./middlewares/cors.middleware');
const { socketOperations } = require('./services/socket-notifications.service');

const swaggerDocument = YAML.load('./openapi.yaml');

const port = process.env.PORT || 3000;
const routePath = './routes/';
const app = express();
var httpApp;

// Settings
app.use(cookieParser());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cors);
app.use(express.static(path.join(__dirname, './views/build')));
app.use('/', express.static(path.join(__dirname, './views/build')));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Load Routes Dynamically
fs.readdirSync(routePath).forEach(function (file) {
  const routeFile = require(routePath + file);
  app.use('/v1', routeFile);
});
app.use(handleErrors);

app.get('/*', function (req, res) {
  res.sendFile(path.resolve(__dirname, './views/build/index.html'));
});

// app.listen(port, process.env.HOST, function () {
//   console.log("The server is listening at http://" + process.env.HOST + ":" + port)
// });


httpApp = httpServer.createServer(app);

httpApp = httpApp.listen(process.env.PORT || port, process.env.HOST || "0.0.0.0", function() {
  console.log("The server is listening at http://" + process.env.HOST + ":" + port);
});

socketOperations(httpApp, JSON.parse(process.env.SOCKET_CONFIG));

module.exports = app;
