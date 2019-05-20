'use strict';
module.exports = (sequelize, DataTypes) => {
  var Menu = sequelize.define('Menu', {
    name: { 
    type: DataTypes.STRING,
    allowNull: false
    },
    description: {
    type: DataTypes.STRING,
    allowNull: false
    },
    price: {
    type: DataTypes.INTEGER,
    allowNull: false
    },
    imgsrc: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  Menu.associate = function(models) {
    // associations can be defined here
  };
  return Menu;
};