'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      "Menus",
      "imgsrc",
      {
        type: Sequelize.STRING,
        allowNull: false,
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("Menus", "imgsrc");
  }
};
