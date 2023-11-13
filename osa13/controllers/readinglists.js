const router = require('express').Router();

const { Readlist } = require('../models');

router.post('/', async (req, res, next) => {
  try {
    const body = req.body;
    const entry = await Readlist.create(body);
    res.json(entry);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
