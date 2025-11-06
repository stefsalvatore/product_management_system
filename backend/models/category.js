'use strict';

const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    unique_id: {
      type: DataTypes.STRING(36),
      allowNull: false,
      unique: true,
      defaultValue: () => uuidv4()
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true
      }
    }
  }, {
    tableName: 'categories',
    timestamps: true,
    underscored: true,
    hooks: {
      beforeCreate: (category) => {
        if (!category.unique_id) {
          category.unique_id = uuidv4();
        }
      }
    }
  });

  Category.associate = function(models) {
    Category.hasMany(models.Product, {
      foreignKey: 'category_id',
      as: 'products',
      onDelete: 'CASCADE'
    });
  };

  return Category;
};
