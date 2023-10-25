const { Model, DataTypes } = require('sequelize');

const { sequelize } = require('../utils/db');

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
      type: DataTypes.TEXT,
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
    year: {
      type: DataTypes.INTEGER,
      validate: {
        fitsTheCriteria(value) {
          if (value > new Date().getFullYear()) {
            throw new Error('Year cannot be in the future');
          } else if (value < 1991) {
            throw new Error('Year cannot be less than 1991');
          }
        },
      },
    },
  },
  {
    sequelize,
    underscored: true,
    modelName: 'blog',
  }
);

module.exports = Blog;
