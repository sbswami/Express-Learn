const log4js = require('log4js');

require('dotenv').config();
log4js.configure({
  appenders: {
    logstash: {
      type: '@log4js-node/logstash-http',
      url: 'https://953c1956fa3146b387c3ad6c57e27b0f.ap-southeast-1.aws.found.io:9243',
      application: 'full_bootcamp_log',
      logType: 'application',
    },
    console: {
      type: 'stdout',
      layout: {
        type: 'pattern',
        pattern: '%d{yyyy-MM-dd hh:mm:ss.SSS %p %c %m',
      }
    },
    file: {
      type: 'file',
      filename: 'full-bootcamp-logs.log',
      maxLogSize: 10485760,
      compress: true,
    },
    debug_file: {
      type: 'file',
      filename: 'debug-full-bootcamp-logs.log',
      maxLogSize: 10485760,
      compress: true,
    }
  },
  categories: {
    default: { appenders: ['file', 'logstash'], level: 'debug' },
    console: { appenders: ['debug_file', 'logstash'], level: 'debug' }
  }
});

const logger = log4js.getLogger();
const consoleLogger = log4js.getLogger('console');
module.exports = { logger, consoleLogger };
