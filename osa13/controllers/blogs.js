const router = require('express').Router();

const { blogFinder } = require('../middleware');
const { Blog } = require('../models');

router.get('/', async (req, res) => {
  const allblogs = await Blog.findAll();
  res.json(allblogs);
});

router.post('/', async (req, res, next) => {
  try {
    const body = req.body;
    const newBlog = await Blog.create(body);
    res.json(newBlog);
  } catch (error) {
    return next(error);
  }
});

router.delete('/:id', blogFinder, async (req, res) => {
  if (req.blog) {
    await req.blog.destroy();
    res.status(204).json({ message: 'Successfully deleted blog' });
  } else {
    throw Error('InvalidBlogId');
  }
});

router.put('/:id', blogFinder, async (req, res) => {
  if (req.blog) {
    const newLikes = req.body.likes;
    if (typeof newLikes !== 'number') {
      throw Error('LikeIsNotNumber');
    }
    try {
      req.blog.likes = newLikes;
      await req.blog.save();
      res.json(req.blog);
    } catch (error) {
      return next(error);
    }
  } else {
    throw Error('InvalidBlogId');
  }
});

module.exports = router;
