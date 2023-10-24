const router = require('express').Router();

const { User } = require('../models');

router.get('/', async (req, res) => {
  const users = await User.findAll();
  res.json(users);
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
