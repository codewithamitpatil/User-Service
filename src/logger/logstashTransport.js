
// logstash collector to send winston
// logs to elastic search

const WinstonLogStash = require('winston3-logstash-transport');

module.exports = new WinstonLogStash({
                    mode: 'udp',
                    host: '172.31.5.45',
                    port: 5001
                  });