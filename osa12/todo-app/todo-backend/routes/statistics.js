const express = require('express');
const router = express.Router();
const { getAsync } = require('../redis');

/* GET statistics. */
router.get('/', async (_, res) => {
  const stats = await getAsync('todoCount');
  res.send({ todoCount: stats ? stats : '0' });
});

module.exports = router;
