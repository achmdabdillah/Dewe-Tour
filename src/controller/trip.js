const { trip, country } = require('../../models');
const cloudinary = require('../thirdparty/cloudinary');

exports.addTrip = async (req, res) => {
	try {
		// const tripExist = await trip.findOne({
		// 	where: {
		// 		title: req.body.title,
		// 	},
		// 	attributes: {
		// 		exclude: ['createdAt', 'updatedAt'],
		// 	},
		// });

		// if (tripExist) {
		// 	res.status(400).send({
		// 		status: 'failed',
		// 		messages: 'trip already exist',
		// 	});
		// 	return;
		// }
		// const { images } = req.files;

		// let imagesURL = [];
		// for (let image of images) {
		// 	console.log(process.env.PATHFILE + image.path);
		// 	const result = await cloudinary.uploader.upload(
		// 		process.env.PATHFILE + image.path,
		// 		{
		// 			folder: 'dewe-tour-trips',
		// 		}
		// 	);
		// 	imagesURL.push(result.secure_url);
		// }
		// imagesURL = JSON.stringify(imagesURL);
		// console.log(imagesURL);
		// const newTrip = await trip.create({
		// 	...req.body,
		// 	images: imagesURL,
		// });

		// let showTrip = await trip.findOne({
		// 	where: {
		// 		id: newTrip.id,
		// 	},
		// 	include: {
		// 		model: country,
		// 		as: 'country',
		// 		attributes: {
		// 			exclude: ['createdAt', 'updatedAt'],
		// 		},
		// 	},
		// 	attributes: {
		// 		exclude: ['createdAt', 'updatedAt', 'idCountry'],
		// 	},
		// });

		// showTrip = JSON.parse(JSON.stringify(showTrip));
		// showTrip.images = JSON.parse(showTrip.images);

		const { ...data } = req.body;

		const multiplePicturePromise = req.files.images.map(el => {
			return cloudinary.uploader.upload(el.path, {
				folder: 'dewe-tour-trips',
				use_filename: true,
				unique_filename: true,
			});
		});

		const image = await Promise.all(multiplePicturePromise);

		const newImage = image.map(el => el.url);
		console.log(newImage);

		await trip.create({
			...data,
			images: JSON.stringify(newImage),
			quotaFilled: 0,
		});

		res.status(200).send({
			status: 'success',
			message: 'add trip success',
		});

		// res.status(200).send({
		// 	status: 'success',
		// 	messages: 'trip succesfully added',
		// 	data: showTrip,
		// });
	} catch (error) {
		console.log(error);
		res.status(500).send({
			status: 'failed',
			message: 'Server Error',
		});
	}
};

exports.getTrips = async (req, res) => {
	try {
		let trips = await trip.findAll({
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
		});

		trips.map(trip => {
			trip.images = JSON.parse(trip.images);
		});

		res.status(200).send({
			status: 'success',
			data: trips,
		});
	} catch (error) {
		console.log(error);
		res.send({
			status: 'failed',
			message: 'Server Error',
		});
	}
};

exports.getTrip = async (req, res) => {
	try {
		const { id } = req.params;

		let data = await trip.findOne({
			where: {
				id,
			},
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
		});

		data = JSON.parse(JSON.stringify(data));
		data.images = JSON.parse(data.images);
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

exports.updateTrip = async (req, res) => {
	try {
		const { id } = req.params;
		await trip.update(req.body, {
			where: {
				id,
			},
		});

		const newTrip = await trip.findOne({
			where: {
				id,
			},
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
		});

		res.status(200).send({
			status: 'success',
			data: newTrip,
		});
	} catch (error) {
		console.log(error);
		res.status(500).send({
			status: 'failed',
			message: 'Server Error',
		});
	}
};

exports.deleteTrip = async (req, res) => {
	try {
		const { id } = req.params;

		const tripExist = await trip.findOne({
			where: {
				id,
			},
		});

		if (!tripExist) {
			res.status(400).send({
				status: 'failed',
				messages: "trip isn't exist",
			});
		}

		await trip.destroy({
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