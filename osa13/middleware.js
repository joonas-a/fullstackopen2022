const { Blog, User } = require('./models');

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id);
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
  } else {
    // should only happen in case of an unhandled error
    res
      .status(400)
      .send({ error: 'Something went wrong. Please try again later.' });
  }
};

module.exports = {
  blogFinder,
  unknownEndpoint,
  errorHandler,
};
