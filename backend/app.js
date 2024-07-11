const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose')
const morgan = require('morgan');
const app = express();
const context = require("./models/context");
const signupRouter = require("./routes/api-register");
const userRouter = require("./routes/api-user");
const jobRouter = require("./routes/api-job");
require('dotenv').config();
// const config = require("config");
const Queue = require('bull');

const jobQueue = new Queue('jobQueue', {
  redis: {
    host: '127.0.0.1',
    port: 6379
  }
});

const options = [
  cors({
    origin: '*',
    methods: '*',
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
];
app.use(morgan("dev"));
app.use(cors(options));
app.use(express.json());
app.use(async(req, res, next) => {
    req._scope = await context.getOrCreateScope();
    next();
});
const db = `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@task-codistan.cpubdyu.mongodb.net/`
const PORT = process.env.PORT || 5000;
mongoose.connect(db,{
  useNewUrlParser:true,
  useUnifiedTopology:true
}).then(()=>{
  app.listen(PORT,()=>{
      console.log(`Server Running on PORT ${PORT}`)
  })
}).catch((error)=>{
  console.log(error)
})


app.use("/api/job", jobRouter);
app.use("/api/", signupRouter);
app.use("/api/", userRouter);
jobQueue.process(async (job) => {
  console.log(`Processing job ${job.id} with data ${JSON.stringify(job.data)}`);
  await new Promise((resolve) => setTimeout(resolve, 5000));

  return { result: `Job ${job.id} processed successfully` };
});

// Event listeners for job completion and failure
jobQueue.on('completed', (job, result) => {
  console.log(`Job ${job.id} completed with result ${result}`);
});

jobQueue.on('failed', (job, err) => {
  console.log(`Job ${job.id} failed with error ${err.message}`);
});
module.exports = app;