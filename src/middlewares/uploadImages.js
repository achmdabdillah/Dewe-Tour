// import package here
const multer = require('multer');

exports.uploadImages = (images, path) => {
	// define storage destination
	const storage = multer.diskStorage({
		filename: function (req, file, cb) {
			//second params is the filename
			cb(null, Date.now() + '-' + file.originalname.replace(/\s/g, ''));
		},
	});

	// define function for file filtering
	const fileFilter = (req, file, cb) => {
		if (file.fieldname === images) {
			if (!file.originalname.match(/\.(jpg|JPG|JPEG|png|PNG|svg)$/)) {
				req.fileValidationError = {
					message: 'Only image files are allowed!',
				};

				return cb(new Error('Only image files are allowed'), false);
			}
			cb(null, true);
		}
	};

	// maximum size for file upload
	const sizeInMB = 50;
	const maxSize = sizeInMB * 1024 * 1024;

	const upload = multer({
		storage,
		fileFilter,
		limits: {
			fileSize: maxSize,
		},
	}).fields([
		{
			name: images,
			maxCount: 4,
		},
	]);

	return (req, res, next) => {
		upload(req, res, function (err) {
			if (req.fileValidationError) {
				return res.status(400).send(req.fileValidationError);
			}

			if (!req.files && !err) {
				return res.status(400).send({
					message: 'Please select file to upload',
				});
			}

			if (err) {
				if (err.code === 'LIMIT_FILE_SIZE') {
					return res.status(400).send({
						message: 'Max file sized is 10MB',
					});
				}
				return res.status(400).send(err);
			}
			return next();
		});
	};
};
