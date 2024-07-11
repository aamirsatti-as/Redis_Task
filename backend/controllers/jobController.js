const jobQueue = require('../redis/jobQueue');

const createJob = async (req, res) => {
    try {
        const { body: params } = req;
        const job = await jobQueue.add({ params });
        res.status(201).send({ jobId: job.id });

    } catch (err) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}
const getJobResult = async (req, res) => {
    const { id } = req.params;
    const job = await jobQueue.getJob(id);

    if (job) {
        if (job.finishedOn) {
            res.send({ result: job.returnvalue });
        } else {
            res.status(400).send({ error: 'Job not finished yet' });
        }
    } else {
        res.status(404).send({ error: 'Job not found' });
    }

}

const getJobStatus = async (req, res) => {
    const { id } = req.params;
    const job = await jobQueue.getJob(id);

    if (job) {
        const state = await job.getState();
        res.send({ state });
    } else {
        res.status(404).send({ error: 'Job not found' });
    }
}

module.exports = {
    createJob,
    getJobResult,
    getJobStatus
};
