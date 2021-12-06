'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		module.exports = {
			up: (queryInterface, Sequelize) => {
				return queryInterface.bulkInsert('users', [
					{
						fullName: 'Admin',
						email: 'admin@gmail.com',
						password: '123123',
						createdAt: new Date(),
						updatedAt: new Date(),
					},
				]);
			},
			down: (queryInterface, Sequelize) => {
				return queryInterface.bulkDelete('Users', null, {});
			},
		};
		/**
		 * Add seed commands here.
		 *
		 * Example:
		 * await queryInterface.bulkInsert('People', [{
		 *   name: 'John Doe',
		 *   isBetaMember: false
		 * }], {});
		 */
	},

	down: async (queryInterface, Sequelize) => {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
	},
};
