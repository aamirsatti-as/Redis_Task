const Queue = require('bull');
const redisConfig = {
  redis: {
    host: '127.0.0.1',
    port: 6379,
  },
};

const jobQueue = new Queue('jobQueue', redisConfig);

module.exports = jobQueue;
