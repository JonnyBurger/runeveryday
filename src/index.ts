import express from 'express';

const app = express();

app.use('/', (request, response) => {
	response.end('hihi');
});

app.listen(1200);
console.log('App listening');
