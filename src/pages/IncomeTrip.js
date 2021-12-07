import { useHistory } from 'react-router';
import { useState } from 'react';
import Swal from 'sweetalert2';
import Nav from '../components/Structure/Nav/Nav';
import Footer from '../components/Structure/Footer';
import GroupCards from '../components/Card/GroupCards';

import { API } from '../config/api';

const IncomeTrip = () => {
	const history = useHistory();

	const handleToAddTrip = () => {
		history.push('/add-trip');
	};

	// ADD COUNTRY
	const [country, setCountry] = useState({ name: '' });
	const handleOnChange = e => {
		setCountry({ name: e.target.value });
	};

	const handleAddCountry = async () => {
		try {
			const config = {
				headers: {
					'Content-type': 'application/json',
				},
			};

			const response = await API.post(`/countries`, country, config);
			if ((response.data.status = 200)) {
				setCountry({ name: '' });
				Swal.fire({
					icon: 'success',
					title: 'Success',
					text: 'Country added',
				});
			}
		} catch (error) {
			setCountry({ name: '' });
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Country already added!',
			});
			console.log(error);
		}
	};

	return (
		<>
			<Nav />
			<div className="mt-5 income-trip-container">
				<div className="d-flex justify-content-between income-trip-header">
					<h1>Income Trip</h1>
					<div>
						<button
							data-bs-toggle="modal"
							data-bs-target="#addCountry"
							className="add-trip-btn me-5"
						>
							Add Country
						</button>
						<button className="add-trip-btn" onClick={handleToAddTrip}>
							Add Trip
						</button>
					</div>
				</div>
				<div className="modal fade" id="addCountry">
					<div className="modal-dialog modal-dialog-centered">
						<div className="modal-content width150">
							<div className="modal-header">
								<img src="/assets/palm1.png" alt="" className="palm" />
								<div className="modal-title">Add Country</div>
								<img src="/assets/flower.png" alt="" className="flower" />
							</div>
							<div className="add-country">
								<input
									onChange={e => handleOnChange(e)}
									type="text"
									value={country.name}
									placeholder="Country name.."
								/>
								<button
									data-bs-dismiss="modal"
									onClick={handleAddCountry}
									className="add-trip-btn"
								>
									Add
								</button>
							</div>
						</div>
					</div>
				</div>
				<GroupCards search={''} />
			</div>
			<Footer />
		</>
	);
};

export default IncomeTrip;
