'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Book.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull: {
          msg: '"Title" cannot be empty'
        },
        notEmpty:{
          msg: '"Title" cannot be empty'
        }
      }
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull:{
          msg: '"Author" cannot be empty'
        },
        notEmpty:{
          msg: '"Author" cannot be empty'
        }
      }
    },
    genre: DataTypes.STRING,
    year: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: {
          msg: '"Year" must be an integer'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Book',
  });
  return Book;
};