const jwt = require('jsonwebtoken');
const router = require('express').Router();

const { SECRET } = require('../utils/config');
const User = require('../models/user');
const Session = require('../models/session');
const { tokenExtractor } = require('../middleware');

router.post('/', async (request, response) => {
  const body = request.body;

  const user = await User.findOne({
    where: {
      username: body.username,
    },
  });

  const passwordCorrect = body.password === 'salainen';

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password',
    });
  }

  if (user.disabled === 'true') {
    return response.status(401).json({
      error: 'Account disabled. Please contact an admin.',
    });
  }

  const userForToken = {
    username: user.username,
    id: user.id,
  };

  const token = jwt.sign(userForToken, SECRET);

  await Session.create({ key: token, userId: user.id });

  response
    .status(200)
    .send({ token, username: user.username, name: user.name });
});

router.delete('/', tokenExtractor, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.decodedToken.id);
    await Session.destroy({
      where: {
        userId: user.id,
      },
    });
    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
