const bcrypt = require("bcrypt");
const jobQueue = require('../redis/jobQueue');

module.exports = () => {
  const createJob = async (data) => {
    const job = await jobQueue.add({ data });
    res.status(201).send({ jobId: job.id });
  };  
  return {
    createJob
  };
};
