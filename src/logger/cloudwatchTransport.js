
// to transport logs to aws cloud watch

const CloudWatchTransport = require('winston-aws-cloudwatch');


module.exports = new CloudWatchTransport({
      logGroupName: 'Authservice', 
      logStreamName: 'authfirst',
      createLogGroup: true,
      createLogStream: true,
      submissionInterval: 2000,
      submissionRetryCount: 1,
      batchSize: 20,
      awsConfig: {
        accessKeyId: 'AKIASYXN5TANFXM5EA4Z',
        secretAccessKey: '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',
        region: 'ap-south-1'
      },
      formatLog: item =>
        `${item.level}: ${item.message} ${JSON.stringify(item.meta)}`
 });
