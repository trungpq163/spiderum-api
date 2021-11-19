import chalk from 'chalk';
import cors from 'cors';
import { config } from 'dotenv';

import errorHandler from 'errorhandler';
import express from 'express';
import fileUpload from 'express-fileupload';

import auth from './api/auth';
import userPost from './api/user-post';

// Call config dotenv
config();

// Create express app
const app = express();
const port = 3000;

// File upload
app.use(fileUpload());

// CORS
app.use(cors());
app.options('*', cors());

// JSON body parser
app.use(express.json({ limit: '50mb' }));
// urlencoded body parser
app.use(
  express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 1000000 })
);

// Root routes
app.get('/', (req, res) => {
  res.status(200).send('Hello World!');
});

// Mount routes
app.use('/api/v1/auth', auth);
app.use('/api/v1/relation/user-post', userPost);

// Error handler middleware (must be last)
if (process.env.NODE_ENV === 'development') {
  app.use(errorHandler());
}

// Start server
app.listen(port, () => {
  console.log(
    `[${new Date().toISOString()}]`,
    chalk.blue(`App is running: http://localhost:3000`)
  );
});
