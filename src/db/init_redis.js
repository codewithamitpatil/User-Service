
const redis = require('redis');
const { redisDb } = require('./../config/index');

// importing logger
const logger = require('../logger/logger');

const client = redis.createClient(redisDb);

client.on('connect',async()=>{

  console.log(' Redis Connected SuccessFully'); 
  logger.info({
     message:`Redis Connected `,
     Function:"connect",
     File:"db/init_redis.js",
     Purpose: "To check redis is started  or not",
   });
});

client.on('error',async(err)=>{
   logger.error({
     message:`${err}`,
     Function:"error",
     File:"db/init_redis.js",
     Purpose: "To check redis connection error",
   });
});

client.on('end',async()=>{
  logger.info({
     message:`Redis End `,
     Function:"connect",
     File:"db/init_redis.js",
     Purpose: "",
   });
});

process.on('SIGINT',()=>{
   client.quit();
   process.exit(0);
});

module.exports = client;



