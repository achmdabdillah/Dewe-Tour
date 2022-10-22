const router = require('express').Router();

// ---------------------------------------------------CONTROLLER-------------------------------------------------

const { register, login, checkAuth } = require('../controller/auth');
const {
	getUser,
	getUsers,
	deleteUser,
	updateUser,
} = require('../controller/user');

const {
	addCountry,
	getCountries,
	getCountry,
	deleteCountry,
	updateCountry,
} = require('../controller/country');

const {
	addTrip,
	getTrips,
	getTrip,
	updateTrip,
	deleteTrip,
} = require('../controller/trip');

const {
	addTransaction,
	getTransactions,
	getTransaction,
	updateTransaction,
	updateTransactionStatus,
} = require('../controller/transaction');

// ------------------------------------------------MIDDLEWARES--------------------------------------------------

const { uploadImage } = require('../middlewares/uploadImage');
const { auth } = require('../middlewares/auth');
const { uploadImages } = require('../middlewares/uploadImages');
const { isAdmin } = require('../middlewares/isAdmin');

// ---------------------------------------------------ROUTER----------------------------------------------------

// USERS
router.post('/register', register);
router.post('/login', login);
router.get('/check-auth', auth, checkAuth);
router.get('/users', auth, isAdmin, getUsers);
router.get('/user', auth, getUser);
router.patch('/users', auth, uploadImage('image', 'profilePic'), updateUser);
router.delete('/users/:id', auth, isAdmin, deleteUser);

// COUNTRY
router.post('/countries', auth, isAdmin, addCountry);
router.get('/countries', getCountries);
router.get('/countries/:id', getCountry);
router.delete('/countries/:id', auth, isAdmin, deleteCountry);
router.patch('/countries/:id', auth, isAdmin, updateCountry);

// TRIP
router.post('/trips', auth, uploadImages('images', 'trip'), addTrip);
router.get('/trips', getTrips);
router.get('/trips/:id', getTrip);
router.patch('/trips/:id', auth, updateTrip);
router.delete('/trips/:id', auth, deleteTrip);

// TRANSACTION
router.post('/transactions', auth, addTransaction);
router.get('/transactions', auth, isAdmin, getTransactions);
router.get('/transaction', auth, getTransaction);
router.patch(
	'/transactions/:id',
	auth,
	uploadImage('image', 'payment'),
	updateTransaction
);
router.patch(
	'/transactionstatus/:id', auth, updateTransactionStatus
);

module.exports = router;
