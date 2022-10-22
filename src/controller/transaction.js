const { transaction, trip, country, user } = require('../../models');
const Joi = require('joi');
const cloudinary = require('../thirdparty/cloudinary');

exports.addTransaction = async (req, res) => {
	// validation schema
	const schema = Joi.object({
		counterQty: Joi.number().required(),
		total: Joi.number().required(),
		attachment: Joi.string(),
		idTrip: Joi.number().required(),
	});

	const { error } = schema.validate(req.body);

	if (error) {
		return res.status(400).send({
			error: {
				message: error.details[0].message,
			},
		});
	}

	try {
		const { idUser } = req.user;
		// const attachment = req.file.filename
		const { idTrip } = req.body;

		const tripExist = await trip.findOne({
			where: {
				id: idTrip,
			},
		});

		if (!tripExist) {
			res.status(400).send({
				status: 'failed',
				messages: "trip isn't exist",
			});
		}

		const newTransaction = await transaction.create({
			...req.body,
			status: 'Waiting Payment',
			idUser,
		});

		const showTransaction = await transaction.findOne({
			where: {
				id: newTransaction.id,
			},
			include: {
				model: trip,
				as: 'trip',
				include: {
					model: country,
					as: 'country',
					attributes: {
						exclude: ['createdAt', 'updatedAt'],
					},
				},
				attributes: {
					exclude: ['createdAt', 'updatedAt', 'idCountry'],
				},
			},
			attributes: {
				exclude: ['createdAt', 'updatedAt', 'idCountry', 'idUser'],
			},
		});

		res.status(200).send({
			status: 'success',
			messages: 'transaction succesfully added',
			data: showTransaction,
		});
	} catch (error) {
		console.log(error);
		res.status(500).send({
			status: 'failed',
			message: 'Server Error',
		});
	}
};

exports.getTransactions = async (req, res) => {
	try {
		const transactions = await transaction.findAll({
			include: [
				{
					model: user,
					as: 'user',
					attributes: {
						exclude: [
							'createdAt',
							'updatedAt',
							'password',
							'status',
							'address',
						],
					},
				},

				{
					model: trip,
					as: 'trip',
					include: {
						model: country,
						as: 'country',
						attributes: {
							exclude: ['createdAt', 'updatedAt'],
						},
					},
					attributes: {
						exclude: ['createdAt', 'updatedAt', 'idCountry'],
					},
				},
			],
			attributes: {
				exclude: ['updatedAt', 'idCountry'],
			},
		});

		res.status(200).send({
			status: 'success',
			data: {
				transactions,
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

exports.getTransaction = async (req, res) => {
	try {
		const { idUser } = req.user;

		const data = await transaction.findAll({
			where: {
				idUser,
			},
			include: [
				{
					model: user,
					as: 'user',
					attributes: {
						exclude: [
							'createdAt',
							'updatedAt',
							'password',
							'status',
							'address',
						],
					},
				},

				{
					model: trip,
					as: 'trip',
					include: {
						model: country,
						as: 'country',
						attributes: {
							exclude: ['createdAt', 'updatedAt'],
						},
					},
					attributes: {
						exclude: ['createdAt', 'updatedAt', 'idCountry'],
					},
				},
			],
			attributes: {
				exclude: ['updatedAt', 'idCountry', 'idUser'],
			},
		});

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

exports.updateTransaction = async (req, res) => {
	try {
		const { id } = req.params;
		console.log(req)
		const oldData = await transaction.findOne({
			where: {
				id,
			},
			attributes: {
				exclude: ['updatedAt', 'idCountry', 'idUser'],
			},
		});

		const ImgURL = await cloudinary.uploader.upload(req.file.path, {
			folder: 'dewe_tour/paymentProof',
		});

		const attachment = req.file ? ImgURL.secure_url : oldData.attachment;
		await transaction.update(
			{
				...req.body,
				attachment,
			},
			{
				where: {
					id,
				},
			}
		);

		const newTransaction = await transaction.findOne({
			where: {
				id,
			},
			include: {
				model: trip,
				as: 'trip',
				include: {
					model: country,
					as: 'country',
					attributes: {
						exclude: ['createdAt', 'updatedAt'],
					},
				},
				attributes: {
					exclude: ['createdAt', 'updatedAt', 'idCountry'],
				},
			},
			attributes: {
				exclude: ['createdAt', 'updatedAt', 'idCountry', 'idUser'],
			},
		});

		res.status(200).send({
			status: 'success',
			data: newTransaction,
		});
	} catch (error) {
		console.log(error);
		res.status(500).send({
			status: 'failed',
			message: 'Server Error',
		});
	}
};
exports.updateTransactionStatus = async (req, res) => {
	try {
		const { id } = req.params;
		const oldData = await transaction.findOne({
			where: {
				id,
			},
			attributes: {
				exclude: ['updatedAt', 'idCountry', 'idUser'],
			},
		});


		const {attachment} = oldData;
		await transaction.update(
			{
				...req.body,
				attachment,
			},
			{
				where: {
					id,
				},
			}
		);

		const newTransaction = await transaction.findOne({
			where: {
				id,
			},
			include: {
				model: trip,
				as: 'trip',
				include: {
					model: country,
					as: 'country',
					attributes: {
						exclude: ['createdAt', 'updatedAt'],
					},
				},
				attributes: {
					exclude: ['createdAt', 'updatedAt', 'idCountry'],
				},
			},
			attributes: {
				exclude: ['createdAt', 'updatedAt', 'idCountry', 'idUser'],
			},
		});

		res.status(200).send({
			status: 'success',
			data: newTransaction,
		});
	} catch (error) {
		console.log(error);
		res.status(500).send({
			status: 'failed',
			message: 'Server Error',
		});
	}
};
