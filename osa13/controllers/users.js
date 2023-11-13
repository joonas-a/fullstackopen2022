const router = require('express').Router();

const { Op } = require('sequelize');
const { User, Blog } = require('../models');

router.get('/', async (req, res) => {
  const users = await User.findAll({
    include: {
      model: Blog,
      attributes: { exclude: ['userId'] },
    },
  });
  res.json(users);
});

router.get('/:id', async (req, res, next) => {
  let where = {};

  if (req.query.read) {
    where = {
      isRead: req.query.read === 'true',
    };
  }

  try {
    const user = await User.findByPk(req.params.id, {
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
      include: {
        model: Blog,
        as: 'readings',
        attributes: { exclude: ['userId', 'createdAt', 'updatedAt'] },
        through: {
          attributes: ['id', 'isRead'],
          where,
        },
      },
    });
    res.json(user);
  } catch (error) {
    return next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    console.log(req.body);
    res.json(user);
  } catch (error) {
    return next(error);
  }
});

router.put('/:username', async (req, res, next) => {
  const selectedUser = await User.findOne({
    where: { username: req.params.username },
  });
  if (!selectedUser) {
    throw Error('InvalidUsername');
  }
  try {
    selectedUser.name = req.body.name;
    await selectedUser.save();
    res.json(selectedUser);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
