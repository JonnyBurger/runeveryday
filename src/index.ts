import dotenv from 'dotenv';
import server from './server';

dotenv.config();

server.listen(1200);
console.log('Server started');
