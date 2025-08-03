'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('blogs', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      slug: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      author: {
        type: Sequelize.STRING,
        allowNull: false
      },
      is_published: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      comment_count: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false,
        field: 'comment' // Maps to 'comment' column in DB
      },
      likes_count: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false,
        field: 'likes' // Maps to 'likes' column in DB
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true
      }
    });
    await queryInterface.addIndex('blogs', ['title', 'author']);
  },

  async down(queryInterface) {
    await queryInterface.dropTable('blogs');
    await queryInterface.removeIndex('blogs', ['title', 'author']);
  }
};
