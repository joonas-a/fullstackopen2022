const express = require('express');
const { Todo } = require('../mongo');
const router = express.Router();
const { getAsync, setAsync } = require('../redis');

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({});
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false,
  });

  let newCount = 1;
  const todoCount = await getAsync('todoCount');
  if (todoCount) {
    newCount = parseInt(todoCount) + 1;
  }
  await setAsync('todoCount', newCount);
  console.log(todoCount);

  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params;
  req.todo = await Todo.findById(id);
  if (!req.todo) return res.sendStatus(404);

  next();
};

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete();
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  res.send(req.todo);
});

/* PUT todo. (to switch todo status) */
singleRouter.put('/', async (req, res) => {
  const todo = req.todo;
  todo.done = !todo.done;
  await todo.save();
  res.send(todo);
});

router.use('/:id', findByIdMiddleware, singleRouter);

module.exports = router;
