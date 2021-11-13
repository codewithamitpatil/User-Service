// for development
const development = {
  
  service:'UserService',
  
  // for jaeger
  jaegerHost:'13.232.103.57',
  jaegerPort:6832,

  // for env
  isProduction:false,

  env:'development',
  port: process.env.PORT || 3000,
 
  // for jwt
  private_access_key:"amit is the best",
  private_refresh_key:"amit is the best",

  // for otp
  optValidForTime : 5 ,// mins

  // for logger
  logLevel:'silly',
  logPath : './logs/', 

  // for mongodb
  mongodb: 'mongodb://localhost:27017/UserDb',
  mongodbOptions: {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    promiseLibrary: global.Promise
  },

  // for redis
  redisDb:{
    port:6379,
    host:'127.0.0.1'
  },
 
  // for elasticsearch
  elasticHost:"http://65.2.80.123:9200",

  timeDelay:30,
  // for nodemailer
  nodemailerOptions:{
      service: "gmail",
      auth:{
            user: 'amitwebdev2019@gmail.com',
            pass: '8888565473'
           } ,
      tls: {
            rejectUnauthorized: false
           }
  },

  adminMail:'amitwebdev2019@gmail.com',

   // for logger
  loggerConfig:{
    logLevel:process.env.logLevel || "silly",
    logPath:process.env.logPath||"./logs/",
    service:process.env.service || "AuthService"
  },

  // static folder path
  publicFolder:'http://localhost:3000/'


};

// for production
const production = {

  service:'UserService',

    // for jaeger
  jaegerHost:'13.232.103.57',
  jaegerPort:6832,

  // for env
  isProduction:true,

  env:'production',
  // for jwt
  private_access_key:"amit is the best",
  private_refresh_key:"amit is the best",
  
  // for otp
  optValidForTime : 5 ,// mins

  logLevel:'silly',
  logPath : './logs/',
  port: process.env.PORT || 3001,
  mongodb:'mongodb+srv://amit_1:Amit123@authentication.qq25p.mongodb.net/users?retryWrites=true&w=majority',
  // mongodb: 'mongodb://localhost:27017/UserDb',
 
  mongodbOptions: {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  },

  timeDelay:30,

   // for redis
    redisDb:{
      port:12959,
      password:'cfkEeBgmh1pTiAGHChRB1hyhounC0ecZ',
      host:'redis-12959.c10.us-east-1-3.ec2.cloud.redislabs.com'
    },
 
  // for elasticsearch
  elasticHost:"http://65.2.80.123:9200",

  // for nodemailer
  nodemailerOptions:{
      service: "gmail",
      auth:{
            user: 'amitwebdev2019@gmail.com',
            pass: '8888565473'
           } ,
      tls: {
            rejectUnauthorized: false
           }
  },
  adminMail:'amitwebdev2019@gmail.com',

  // for logger
  loggerConfig:{
    logLevel:process.env.logLevel || "silly",
    logPath:process.env.logPath||"./logs/",
    service:process.env.service || "AuthService"
  },

  // static folder path
  publicFolder:'http://localhost:3001/'

};


const isProduction =true;

if (isProduction){
   console.log('Production Env');
}else{
   console.log('Development Env');
}

// module exports
module.exports = isProduction
  ? { ...production  }
  : { ...development };



  
