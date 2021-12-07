import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { AuthContext } from './context/AuthContext';
import { API, setAuthToken } from './config/api';
import { AdminRoute, UserRoute } from './components/Route/PrivateRoute';
import Loader from 'react-loader-spinner';

// PAGES
import Home from './pages/Home';
import DetailTrip from './pages/DetailTrip';
import Payment from './pages/Payment';
import Profile from './pages/Profile';
import ListTransaction from './pages/ListTransaction';
import IncomeTrip from './pages/IncomeTrip';
import AddTrip from './pages/AddTrip';

// init token on axios every time the app is refreshed
if (localStorage.token) {
	setAuthToken(localStorage.token);
}

function App() {
	const { state, dispatch } = useContext(AuthContext);
	console.clear();

	useEffect(() => {
		if (localStorage.token) {
			setAuthToken(localStorage.token);
		}
	}, [state]);

	const checkUser = async () => {
		try {
			const response = await API.get('/check-auth');

			// If the token incorrect
			if (response.status === 404) {
				return dispatch({
					type: 'AUTH_ERROR',
				});
			}

			// Get user data
			let payload = response.data.data;
			// Get token from local storage
			payload.token = localStorage.token;

			// Send data to useContext
			dispatch({
				type: 'AUTH_SUCCESS',
				payload,
			});
		} catch (error) {
			console.log(error);
			dispatch({
				type: 'AUTH_ERROR',
			});
		}
	};

	useEffect(() => {
		const timer = setTimeout(() => {
			checkUser();
		}, 500);
		return () => clearTimeout(timer);
	}, []);

	return (
		<Router>
			<Switch>
				{state.isLoading ? (
					<div className="container">
						<div className="d-flex justify-content-center align-items-center fs-4 vh-100">
							<Loader type="TailSpin" color="#FFAF00" height={80} width={80} />
						</div>
					</div>
				) : (
					<>
						<Route exact path="/" component={Home} />
						<Route exact path="/detail/:id" component={DetailTrip} />
						<UserRoute exact path="/payment" component={Payment} />
						<UserRoute exact path="/profile" component={Profile} />
						<AdminRoute
							exact
							path="/transactions"
							component={ListTransaction}
						/>
						<AdminRoute exact path="/income" component={IncomeTrip} />
						<AdminRoute exact path="/add-trip" component={AddTrip} />
					</>
				)}
			</Switch>
		</Router>
	);
}

export default App;
