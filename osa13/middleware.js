const { Blog, Session, User } = require('./models');
const jwt = require('jsonwebtoken');
const { SECRET } = require('./utils/config');

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id);
  next();
};

const tokenExtractor = async (req, res, next) => {
  const authorization = req.get('authorization');

  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      token = authorization.substring(7);
      decodedToken = jwt.verify(token, SECRET);

      const session = await Session.findOne({
        where: {
          key: token,
        },
        include: {
          model: User,
          attributes: ['id', 'disabled'],
        },
      });

      if (!session) {
        return res
          .status(401)
          .json({ error: 'Session invalid. Try relogging.' });
      }

      if (session.user.disabled === 'true') {
        return res
          .status(401)
          .json({ error: 'User is disabled. Please contact an admin.' });
      }

      req.decodedToken = decodedToken;
    } catch (error) {
      console.log(error);
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
  } else if (error.message === 'UnauthorizedReadlist') {
    res
      .status(401)
      .send({ error: 'Cannot modify readlists that you do not own' });
  } else if (error.message === 'UnauthorizedDelete') {
    res
      .status(401)
      .send({ error: 'Can not delete blogs that you do not own.' });
  } else {
    // should only happen in case of an unhandled error
    console.error(error);
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
