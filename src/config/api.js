import axios from 'axios';

export const API = axios.create({
	baseURL: 'https://dewe-tour-api1.herokuapp.com/api/v1/',
	// process.env.REACT_APP_BASE_API_URL || 'http://localhost:5000/api/v1/',
});

export const setAuthToken = async token => {
	if (token) {
		API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
	} else {
		delete API.defaults.headers.common['Authorization'];
	}
};
