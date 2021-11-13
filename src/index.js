// intialize  env variables
require('dotenv').config();

//importing packages
const   express = require('express');
const   cors = require('cors');
const   helmet = require('helmet');
const   HttpError = require('http-errors');
const   compression = require('compression');
const   methodOverride = require('method-override');
const   path = require('path');
const   bent = require('bent');
const   opentracing = require('opentracing');


// to prevent memory leakage error of winston
require('events').EventEmitter.prototype._maxListeners = 100;

// importing mongodb connection
const {db} = require('./db/mongo_init');

// importing logger
const logger = require('./logger/logger');

// global configrations
const { port , timeDelay ,mongodb } = require('./config'); 


// importing app
const app = require('./app');

// intialize server
const listen = () => {
  app.listen(port,()=>{
    console.log(` Server is listening on port : ${port}`);
    logger.info({
      message:`Server is listening on port : ${port}`,
      Function:"listen()",
      File:"index.js",
      Purpose: "To check server is started  or not",
    });
  });
}

//wrap mongodb connection
const mongoDb =async()=>{
  
   db()
      .on('error', err => { 
          logger.error({
            message:`Failed to connect to mongo`,
            Function:"db()",
            File:"index.js",
            Purpose: err,
          });
      })
      .on('disconnected', () => { 
        setTimeout(listen, timeDelay * 1000 )
      })
      .once('open', () => {
          console.log(' MongoDB connected Successfully!!!')
          logger.info({
            message:`MongoDB connected Successfully!!!`,
            Function:"db()",
            File:"index.js",
            Purpose: "To check mongodb is connected  or not",
          });
          // start server
              listen();
      });
}

// start mongodb
mongoDb();