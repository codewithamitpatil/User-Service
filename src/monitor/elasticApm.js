
// elatic apm client

// importing confing
const { service, apmUrl } = require('../config/index');

const apm = require('elastic-apm-node').start({
   serviceName: service,
   serverUrl: apmUrl 
});

// export
module.exports = apm;