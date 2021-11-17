import express from 'express';
import errorHandler from 'errorhandler';
import fileUpload from 'express-fileupload';
import chalk from 'chalk';
import cors from 'cors';
import { config } from 'dotenv';
import test from './api/test';

// Call config dotenv
config();

const app = express();
const port = 3000;

app.use(fileUpload());

app.use(cors());
app.options('*', cors());

app.use(express.json({ limit: '50mb' }));
app.use(
  express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 1000000 })
);

app.get('/', (req, res) => {
  res.status(200).send('Hello World!');
});

app.use('/test', test);

if (process.env.NODE_ENV === 'development') {
  app.use(errorHandler());
}

app.listen(port, () => {
  console.log(
    `[${new Date().toISOString()}]`,
    chalk.blue(`App is running: http://localhost:3000}`)
  );
});
