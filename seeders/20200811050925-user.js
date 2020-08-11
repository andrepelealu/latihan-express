'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

     for(let i=0 ; i<10 ; i++){
      await queryInterface.bulkInsert('users', [{
        name: `nama ${i}`
      }], {});
     }

    
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
