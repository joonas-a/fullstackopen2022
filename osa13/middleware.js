const { Blog } = require('./models');

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id);
  next();
};

const unknownEndpoint = (error, req, res, next) => {
  res.status(404).send({ error: 'unknown endpoint' });
  next();
};

const errorHandler = (error, req, res, next) => {
  if (error.name === 'SequelizeValidationError') {
    res.status(400).send({ error: 'Invalid data. ' + error.message });
  } else if (error.message === 'LikeIsNotNumber') {
    res.status(400).send({ error: 'Likes must be a number.' });
  } else if (error.message === 'InvalidBlogId') {
    res.status(404).send({ error: 'No blog with given ID found' });
  }
  next(error);
};

module.exports = {
  blogFinder,
  unknownEndpoint,
  errorHandler,
};
