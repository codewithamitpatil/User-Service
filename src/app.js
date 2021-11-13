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
require('events').EventEmitter.prototype._maxListeners = 1000;


// importing tracing middleware
const { initTracer } = require("./tracer/reqTracer");


// importing error handler middleware
const {
        ErrorResponse ,
        Error404
      } = require('./middlewares/errorHandler');

// importing api routes 
const apiRoutes = require('./routes/index');

// global configrations
const { port , timeDelay ,mongodb } = require('./config'); 

// intialize app
const app = express();


// enable cors
app.use('*',cors());


// Helmet: Set Headers for protection 
app.use(helmet({contentSecurityPolicy: false,}));

// compress all
app.use(compression());

// Support PUT, DELETE on client where it doesn't work
app.use(methodOverride());

// intialize morgan logging middleware
require('./logger/morganLogger')(app);

// intialize tracing middleware
require('./tracer/tracer')(app);

// intialize express status monitor
require('./monitor/statusMonitor')(app);


// static folder intialize
app.use(express.static('public'));

// for json  parsing
app.use(express.json());

// for urlencode data parsing
app.use(express.urlencoded({extended:true}));


// intialize api routes
app.use('',apiRoutes);

//  404 error handler
app.all('*',Error404);

// centrlize error handler
app.use(ErrorResponse);



// export app
module.exports = app;