const router = require('express').Router();

const { Op } = require('sequelize');
const { blogFinder, tokenExtractor } = require('../middleware');
const { Blog, User } = require('../models');

router.get('/', async (req, res) => {
  const where = {};

  if (req.query.search) {
    where[Op.or] = [
      {
        title: {
          [Op.iLike]: `%${req.query.search}%`,
        },
      },
      {
        author: {
          [Op.iLike]: `%${req.query.search}%`,
        },
      },
    ];
  }
  const allblogs = await Blog.findAll({
    attributes: { exclude: ['userId'] },
    include: {
      model: User,
      attributes: ['name'],
    },
    where,
  });
  res.json(allblogs);
});

router.post('/', tokenExtractor, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.decodedToken.id);
    const newBlog = await Blog.create({ ...req.body, userId: user.id });
    res.json(newBlog);
  } catch (error) {
    return next(error);
  }
});

router.delete('/:id', blogFinder, tokenExtractor, async (req, res, next) => {
  if (!req.blog) {
    throw Error('InvalidBlogId');
  }
  const user = await User.findByPk(req.decodedToken.id);
  if (!(user.id === req.blog.userId)) {
    throw Error('UnauthorizedDelete');
  }
  try {
    await req.blog.destroy();
    res.status(204).json({ message: 'Successfully deleted blog' });
  } catch (error) {
    next(error);
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
