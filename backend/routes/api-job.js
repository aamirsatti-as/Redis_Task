const router = require('express-promise-router')();
const { createJob, getJobResult, getJobStatus } = require('../controllers/jobController');

router.post('/', createJob)
router.get('/job-result/:id', getJobResult)
router.get('/job-status/:id', getJobStatus)

module.exports = router;
