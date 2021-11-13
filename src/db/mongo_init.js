
const mongoose = require('mongoose');

// importing config
const { mongodb ,mongodbOptions } = require('./../config');


// create mongodb connection
 function db(){
         mongoose.connect(mongodb ,mongodbOptions );
         mongoose.Promise = global.Promise;
         return mongoose.connection;
}

// on connection end
process.on('SIGINT',()=>{
   mongoose.connection.close();
   process.exit(0);
});

// close connection
const Close = ()=>{
   mongoose.connection.close();
};

// module export
module.exports = {db,Close};


