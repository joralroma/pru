const http = require('http');
const cors = require('cors');

const express = require('express');
const path = require('path');

const app = express();
const server = http.createServer(app);

// Database
  const mongoose = require('./config/mongoose');
  const db = mongoose();

// middlewares
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({extended: false}));

// settings
  app.set('port', process.env.PORT || 3000);

// routers
  const userRouters = require('./routes/user');
  const postRouters = require('./routes/post');

// Routes
  app.use('/api/user', userRouters)
  app.use('/api/post', postRouters)

//start server
server.listen(app.get('port'), () => {
  console.log('server en el puerto ',app.get('port'));
})