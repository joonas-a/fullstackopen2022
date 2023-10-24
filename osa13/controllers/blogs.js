const router = require('express').Router();

const { Blog } = require('../models');

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id);
  next();
};

router.get('/', async (req, res) => {
  const allblogs = await Blog.findAll();
  res.json(allblogs);
});

router.post('/', async (req, res) => {
  try {
    const body = req.body;
    const newBlog = await Blog.create(body);
    res.json(newBlog);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.delete('/:id', blogFinder, async (req, res) => {
  if (req.blog) {
    await req.blog.destroy();
  }
  res.status(204).json({ message: 'Successfully deleted blog' });
});

module.exports = router;
