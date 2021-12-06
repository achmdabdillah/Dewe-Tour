'use strict';

const bcrypt = require('bcrypt');

module.exports = {
	up: async (queryInterface, Sequelize) => {
		const hashedPassword = await bcrypt.hash('123123', 10);
		await queryInterface.bulkInsert('users', [
			{
				fullName: 'admin',
				email: 'admin@gmail.com',
				password: hashedPassword,
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
