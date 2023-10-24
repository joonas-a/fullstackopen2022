const { unknownEndpoint, errorHandler } = require('./middleware');
const express = require('express');
const app = express();
require('express-async-errors');

const { PORT } = require('./utils/config');
const { connectToDatabase } = require('./utils/db');

const blogsRouter = require('./controllers/blogs');

app.use(express.json());
app.use('/api/blogs', blogsRouter);

app.use(errorHandler);
app.use(unknownEndpoint);

const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();
