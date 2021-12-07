exports.isAdmin = (req, res, next) => {
	const { status } = req.user;

	// Check if status = admin
	if (status === 'admin') {
		next();
		return;
	} else {
		res.status(403).send({
			status: 'access denied',
			messages: "you're not identified as admin",
		});
	}
};
