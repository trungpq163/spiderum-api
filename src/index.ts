import express from 'express';
import test from './api/test';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.status(200).send('Hello World!');
});

app.use('/test', test);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
