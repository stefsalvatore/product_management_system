'use strict';

const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
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
      validate: {
        notEmpty: true
      }
    },
    image: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        min: 0,
        isDecimal: true
      }
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'categories',
        key: 'id'
      }
    }
  }, {
    tableName: 'products',
    timestamps: true,
    underscored: true,
    hooks: {
      beforeCreate: (product) => {
        if (!product.unique_id) {
          product.unique_id = uuidv4();
        }
      }
    }
  });

  Product.associate = function(models) {
    Product.belongsTo(models.Category, {
      foreignKey: 'category_id',
      as: 'category'
    });
  };

  return Product;
};
