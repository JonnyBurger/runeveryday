import dotenv from 'dotenv';
import express from 'express';
import server from './server';

const app = express();

app.use(server);

dotenv.config();

app.listen(1200);
console.log('Server started');
