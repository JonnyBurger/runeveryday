import express from 'express';
import serverless from 'serverless-http';
import router from '../server';

const app = express();

app.use('/.netlify/functions/runs', router);

module.exports = app;
module.exports.handler = serverless(app);
