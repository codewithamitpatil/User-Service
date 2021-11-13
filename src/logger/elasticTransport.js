// elastic search transport configuration

const { ElasticsearchTransport }  = require('winston-elasticsearch');

// importing config
const { elasticHost ,logLevel } = require('./../config/index');

// options 
const esTransportOpts = {
  level:logLevel,
  clientOpts: {
      node: elasticHost,
      log:  logLevel
  }
};

module.exports = new ElasticsearchTransport(esTransportOpts)