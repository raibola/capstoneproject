'use strict';
module.exports = (sequelize, DataTypes) => {
  var Menu = sequelize.define('Menu', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.NUMBER
  }, {});
  Menu.associate = function(models) {
    // associations can be defined here
  };
  return Menu;
};