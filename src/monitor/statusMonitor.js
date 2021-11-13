
// for server status monitoring

// to check ui hit   http:localhost:3000/status

const statusMonitor = require('express-status-monitor')({
                        chartVisibility: {
                            cpu: true,
                            mem: true,
                            load: true,
                            eventLoop: true,
                            heap: true,
                            responseTime: true,
                            rps: true,
                            statusCodes: true
                        }});

module.exports = app => app.use(statusMonitor);
 