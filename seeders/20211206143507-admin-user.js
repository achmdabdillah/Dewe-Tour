'use strict';

const bcrypt = require('bcrypt');

module.exports = {
	up: async (queryInterface, Sequelize) => {
		const hashedPassword = await bcrypt.hash('123123', 10);

		module.exports = {
			up: (queryInterface, Sequelize) => {
				return queryInterface.bulkInsert('users', [
					{
						fullName: 'admin1',
						email: 'admin1@gmail.com',
						password: hashedPassword,
						gender: 'Male',
						phone: '0888888888888',
						address: 'Bekasi',
						status: 'admin',
						createdAt: new Date(),
						updatedAt: new Date(),
					},
					{
						fullName: 'admin',
						email: 'admin@gmail.com',
						password: hashedPassword,
						gender: 'Male',
						phone: '0888888888888',
						address: 'Bekasi',
						status: 'admin',
						createdAt: new Date(),
						updatedAt: new Date(),
					},
				]);
			},
			down: (queryInterface, Sequelize) => {
				return queryInterface.bulkDelete('users', null, {});
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
