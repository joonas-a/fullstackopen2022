require('dotenv').config();

const { Sequelize, Model, DataTypes } = require('sequelize');
const express = require('express');
const app = express();
app.use(express.json());

const sequelize = new Sequelize(process.env.DATABASE_URL);

class Blog extends Model {}

Blog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    author: {
      type: DataTypes.TEXT,
    },
    url: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    likes: {
      type: DataTypes.INTEGER,
      default: 0,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'blog',
  }
);

Blog.sync();

app.get('/api/blogs', async (req, res) => {
  const allblogs = await Blog.findAll();
  res.json(allblogs);
});

app.post('/api/blogs', async (req, res) => {
  try {
    const body = req.body;
    console.log('body:', req.body);
    const newBlog = await Blog.create(body);
    res.json(newBlog);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

app.delete('/api/blogs/:id', async (req, res) => {
  const idToDelete = req.params.id;
  const blogToDelete = await Blog.findByPk(idToDelete);
  await blogToDelete.destroy();
  res.json({ message: 'Successfully deleted blog' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
