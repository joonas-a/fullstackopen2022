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

router.put('/:id', blogFinder, async (req, res) => {
  if (req.blog) {
    const newLikes = req.body.likes;
    if (typeof newLikes !== 'number') {
      return res.status(400).json({ message: 'Likes must be a number' });
    }
    req.blog.likes = newLikes;
    await req.blog.save();
    res.json(req.blog);
  } else {
    res.status(404).end();
  }
});

module.exports = router;
