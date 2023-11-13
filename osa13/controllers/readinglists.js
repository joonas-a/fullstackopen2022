const router = require('express').Router();
const { tokenExtractor } = require('../middleware');

const { Readlist, User } = require('../models');

router.post('/', async (req, res, next) => {
  try {
    const body = req.body;
    const entry = await Readlist.create(body);
    res.json(entry);
  } catch (error) {
    return next(error);
  }
});

router.put('/:id', tokenExtractor, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.decodedToken.id);
    const read = req.body.read;

    const readlistEntry = await Readlist.findByPk(req.params.id);

    if (readlistEntry.userId !== user.id) {
      throw Error('UnauthorizedReadlist');
    }

    readlistEntry.isRead = read;
    await readlistEntry.save();

    res.json(readlistEntry);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
