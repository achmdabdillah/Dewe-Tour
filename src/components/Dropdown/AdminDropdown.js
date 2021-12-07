import { useHistory } from 'react-router';
import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { API } from '../../config/api';

const AdminDropdown = () => {
	const { dispatch } = useContext(AuthContext);

	const [data, setData] = useState([]);

	const getData = async () => {
		try {
			const response = await API.get('/transactions');

			setData(response.data.data.transactions);
		} catch (error) {
			console.log('Cannot get data');
		}
	};

	const notifCount = data.filter(
		item => item.status === 'Waiting Approve'
	).length;

	useEffect(() => {
		getData();
	}, []);

	const history = useHistory();

	const handleToTrip = () => {
		history.push('/income');
	};

	const handleToTransactions = () => {
		history.push('/transactions');
	};

	return (
		<ul className="navbar-nav">
			<li className="nav-item dropdown">
				<a
					href
					className="nav-link dropdown-toggle"
					id="navbarDarkDropdownMenuLink"
					role="button"
					data-bs-toggle="dropdown"
					aria-expanded="false"
				>
					<div className="relative">
						<img className="box-sm circle" src="/images/Avatar.png" alt="" />
						<div
							class={
								notifCount !== 0 ? 'notifCounterProfile avenir' : 'filestyle'
							}
						>
							<p>{notifCount}</p>
						</div>
					</div>
				</a>
				<ul
					className="dropdown-menu dropdown-menu-end"
					aria-labelledby="navbarDarkDropdownMenuLink"
				>
					<li onClick={handleToTrip} className="trip pointer">
						<img src="/assets/Trip.png" alt="" className="me-3 my-0" />
						<p className="avenir">Trip</p>
					</li>
					<li onClick={handleToTransactions} className="trip pointer relative">
						<div
							class={
								notifCount !== 0 ? 'notifCounterProfile avenir' : 'filestyle'
							}
						>
							<p>{notifCount}</p>
						</div>
						<img src="/assets/bill1.png" alt="" className="me-3 my-0" />
						<p className="avenir">Transactions</p>
					</li>
					<div className="border-bottom"></div>
					<li
						onClick={() => dispatch({ type: 'LOGOUT' })}
						className="logout pointer"
					>
						<img src="/assets/logout1.png" alt="" className="me-3" />
						<p className="avenir">Logout</p>
					</li>
				</ul>
			</li>
		</ul>
	);
};

export default AdminDropdown;
