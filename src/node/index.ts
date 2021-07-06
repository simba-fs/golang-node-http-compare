import express from 'express';
import logger from 'morgan';
import body from 'body-parser';

const app = express();

const port = process.env.nodePort || 3000;

// app.use(logger('dev'));
app.use(body.json());

app.get('/', (req, res, next) => {
	res.send('<h1>hello, this is nodejs</h1>');
})

app.listen(port, () => console.log(`listen on port ${port}`));
