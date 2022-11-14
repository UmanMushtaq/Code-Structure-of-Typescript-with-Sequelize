'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable("users", {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      uuid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: true,
      },

      
      first_name: {
        type: new Sequelize.STRING(255),
        allowNull: false,
      },
      last_name: {
        type: new Sequelize.STRING(255),
        allowNull: false,
      },
      email: {
        type: new Sequelize.STRING(255),
        allowNull: false,
        unique: true,
      },
      password: {
        type: new Sequelize.STRING(255),
        allowNull: false,
      },
      token: {
        type: new Sequelize.STRING(255),
        allowNull: true,
      },
      expiry: {
        type: new Sequelize.DATE(),
        allowNull: true,
      },
      email_verified: {
        type: new Sequelize.BOOLEAN(),
        defaultValue: false,
        allowNull: false,
      },
      updated_at: Sequelize.DATE,
      created_at: Sequelize.DATE,
    });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable("users");
  }
};
