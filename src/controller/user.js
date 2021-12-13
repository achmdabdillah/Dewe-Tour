const { user } = require('../../models');
const cloudinary = require('../thirdparty/cloudinary');

exports.getUsers = async (req, res) => {
	try {
		const users = await user.findAll({
			attributes: {
				exclude: ['profilePicture', 'createdAt', 'updatedAt', 'password'],
			},
		});

		res.send({
			status: 'success',
			data: {
				users,
			},
		});
	} catch (error) {
		console.log(error);
		res.send({
			status: 'failed',
			message: 'Server Error',
		});
	}
};

exports.getUser = async (req, res) => {
	try {
		const { idUser } = req.user;

		const data = await user.findOne({
			where: {
				id: idUser,
			},
			attributes: {
				exclude: ['createdAt', 'updatedAt', 'password'],
			},
		});

		if (!data) {
			return res.status(404).send({
				status: 'failed',
				message: 'User not found',
			});
		}

		res.send({
			status: 'success',
			data,
		});
	} catch (error) {
		console.log(error);
		res.send({
			status: 'failed',
			message: 'Server Error',
		});
	}
};

exports.updateUser = async (req, res) => {
	try {
		const { idUser } = req.user;

		let oldUser = await user.findOne({
			where: {
				id: idUser,
			},
		});
		oldUser = JSON.parse(JSON.stringify(oldUser));

		const ImgURL = await cloudinary.uploader.upload(req.file.path, {
			folder: 'dewe_tour/profilePicture',
		});

		const profilePicture = req.file
			? ImgURL.secure_url
			: oldUser.profilePicture;
		await user.update(
			{
				...req.body,
				profilePicture,
			},
			{
				where: {
					id: idUser,
				},
			}
		);

		const newUser = await user.findOne({
			where: {
				id: idUser,
			},
			attributes: {
				exclude: ['createdAt', 'updatedAt', 'password'],
			},
		});
		res.status(200).send({
			status: 'success',
			data: newUser,
		});
	} catch (error) {
		res.status(500).send({
			status: 'failed',
			messages: 'server error',
		});
	}
};

exports.deleteUser = async (req, res) => {
	try {
		const { id } = req.params;
		await user.destroy({
			where: {
				id,
			},
		});

		res.send({
			status: 'success',
			data: {
				id: `${id}`,
			},
		});
	} catch (error) {
		console.log(error);
		res.send({
			status: 'failed',
			message: 'Server Error',
		});
	}
};
