require('dotenv').config();

const express = require('express');
const cors = require('cors');

const router = require('./src/routes/index');

const app = express();

const PORT = 5000;

app.use(express.json());
app.use(cors());

app.use('/api/v1/', router);
app.use('/uploads', express.static('uploads'));

app.listen(process.env.PORT || PORT, () =>
	console.log(`server listening on port : ${PORT}`)
);
