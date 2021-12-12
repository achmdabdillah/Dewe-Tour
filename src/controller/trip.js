const { trip, country } = require('../../models');

exports.addTrip = async (req, res) => {
	try {
		const tripExist = await trip.findOne({
			where: {
				title: req.body.title,
			},
			attributes: {
				exclude: ['createdAt', 'updatedAt'],
			},
		});

		if (tripExist) {
			res.status(400).send({
				status: 'failed',
				messages: 'trip already exist',
			});
			return;
		}

		const { images } = req.files;
		const allImages = images.map(img => img.filename);
		const allImagesString = JSON.stringify(allImages);

		const showImagesUrl = images.map(
			img => `http://localhost:5000/uploads/trip/${img.filename}`
		);

		const newTrip = await trip.create({
			...req.body,
			images: allImagesString,
		});

		let showTrip = await trip.findOne({
			where: {
				id: newTrip.id,
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
		showTrip = JSON.parse(JSON.stringify(showTrip));

		res.status(200).send({
			status: 'success',
			messages: 'trip succesfully added',
			data: {
				...showTrip,
				images: showImagesUrl,
			},
		});
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
		const trips = await trip.findAll({
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
			const allImages = JSON.parse(trip.images);

			const newImages = allImages.map(
				images => `http://localhost:5000/uploads/trip/${images}`
			);

			trip.images = newImages;
			return trip;
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

		const allImages = JSON.parse(data.images);

		const newImages = allImages.map(
			images => `http://localhost:5000/uploads/trip/${images}`
		);
		data.images = newImages;
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
