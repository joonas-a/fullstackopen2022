const { Blog } = require('./models');
const jwt = require('jsonwebtoken');
const { SECRET } = require('./utils/config');

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id);
  next();
};

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET);
    } catch (error) {
      return res.status(401).json({ error: 'token invalid' });
    }
  } else {
    return res.status(401).json({ error: 'token missing' });
  }
  next();
};

const unknownEndpoint = (error, req, res, next) => {
  res.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (error, req, res, next) => {
  if (error.name === 'SequelizeValidationError') {
    res.status(400).send({ error: 'Invalid data. ' + error.message });
  } else if (error.message === 'LikeIsNotNumber') {
    res.status(400).send({ error: 'Likes must be a number.' });
  } else if (error.message === 'InvalidBlogId') {
    res.status(404).send({ error: 'No blog with given ID found' });
  } else if (error.message === 'InvalidUsername') {
    res.status(404).send({ error: 'No user with given ID found' });
  } else if (error.message === 'UnauthorizedDelete') {
    res
      .status(403)
      .send({ error: 'Can not delete blogs that you do not own.' });
  } else {
    // should only happen in case of an unhandled error
    res
      .status(400)
      .send({ error: 'Something went wrong. Please try again later.' });
  }
};

module.exports = {
  blogFinder,
  tokenExtractor,
  unknownEndpoint,
  errorHandler,
};
