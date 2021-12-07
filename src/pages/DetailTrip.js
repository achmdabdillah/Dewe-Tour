import React, { useState, useContext, useEffect } from 'react';
import LoginModals from '../components/Modal/LoginModals';
import { useParams, useHistory } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Swal from 'sweetalert2';
import Loader from 'react-loader-spinner';

import { API } from '../config/api';

// COMPONENTS
import Nav from '../components/Structure/Nav/Nav';
import Footer from '../components/Structure/Footer';

const DetailTrip = () => {
	const history = useHistory();
	const [trip, setTrip] = useState([]);

	// Login Modals
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const { state } = useContext(AuthContext);

	const { id } = useParams();

	const getTrip = async () => {
		try {
			const response = await API.get(`/trips/${id}`);

			setTrip(response.data.data);
		} catch (error) {
			alert('Cannot get data');
		}
	};

	useEffect(() => {
		getTrip();
	}, []);

	// PRICE
	const [count, setCount] = useState(1);

	const maxQuota = trip?.quota - trip?.quotaFilled;
	const increment = () => {
		setCount(count >= maxQuota ? count : count + 1);
	};
	const decrement = () => {
		setCount(count <= 1 ? count : count - 1);
	};

	const formatter = function (amount) {
		return new Intl.NumberFormat('en-ID', {
			style: 'currency',
			currency: 'IDR',
		}).format(amount);
	};
	const price = formatter(trip.price);
	const totalPrice = formatter(count * trip.price);

	// DATE
	const dateFormatter = inputDate => {
		let data = new Date(inputDate).toString();
		const newDate = data.split(' ');
		return newDate.slice(0, 4);
	};
	const { dateTrip } = trip;
	const date = dateFormatter(dateTrip);

	// Check if there is any unfinished payment
	const [data, setData] = useState([]);
	const getData = async () => {
		try {
			const response = await API.get(`/transaction`);
			setData(response.data.data);
		} catch (error) {
			console.log('Cannot get data');
		}
	};

	useEffect(() => {
		getData();
	}, []);

	const waitingPayment = data?.filter(
		item => item?.status === 'Waiting Payment'
	);

	const handleBook = async () => {
		if (waitingPayment.length > 0) {
			Swal.fire({
				icon: 'error',
				title: 'Failed',
				text: 'finish your last payment',
			});
			history.push('/payment');
		} else {
			try {
				const config = {
					headers: {
						'Content-type': 'application/json',
					},
				};

				const data = {
					total: count * trip.price,
					counterQty: count,
					idTrip: parseInt(id),
				};

				await API.post('/transactions', data, config);
				history.push('/payment');
			} catch (error) {
				console.log(error);
			}
		}
	};
	return (
		<>
			<Nav />
			<div className="detail-container">
				<div className="detail-title">
					<h1>{trip.title}</h1>
					<p className="avenir">{trip.country?.name}</p>
				</div>
				{trip?.length === 0 ? (
					<div className="container">
						<div className="d-flex justify-content-center align-items-center">
							<Loader
								type="ThreeDots"
								color="#FFAF00"
								height={320}
								width={80}
							/>
						</div>
					</div>
				) : (
					<>
						<div className="detail-images">
							<img src={trip?.images[0]} alt="" className="img1" />
							<div className="detail-random">
								<img src={trip?.images[1]} alt="" className="img2" />
								<img src={trip?.images[2]} alt="" className="img3" />
								<img src={trip?.images[3]} alt="" className="img4" />
							</div>
						</div>
					</>
				)}
				<div className="information-trip">
					<h1>Information Trip</h1>
					<div className="flex">
						<div className="info-item">
							<p>Accomodation</p>
							<div className="info-detail">
								<img src="/assets/hotel.png" alt="" />
								<p>{trip?.accomodation}</p>
							</div>
						</div>
						<div className="info-item">
							<p>Transportation</p>
							<div className="info-detail">
								<img src="/assets/plane.png" alt="" />
								<p>{trip?.transportation}</p>
							</div>
						</div>
						<div className="info-item">
							<p>Eat</p>
							<div className="info-detail">
								<img src="/assets/meal.png" alt="" />
								<p>{trip?.eat}</p>
							</div>
						</div>
						<div className="info-item">
							<p>Duration</p>
							<div className="info-detail">
								<img src="/assets/time.png" alt="" />
								<p>
									{trip?.day} Day {trip.night} Night
								</p>
							</div>
						</div>
						<div className="info-item">
							<p>Date Trip</p>
							<div className="info-detail">
								<img src="/assets/calendar.png" alt="" />
								<p>
									{date[0]}, {date[2]} {date[1]} {date[3]}
								</p>
							</div>
						</div>
					</div>
					<div className="info-desc">
						<h1>Description</h1>
						<p>{trip?.description}</p>
					</div>
					{state.user.status !== 'admin' ? (
						<div>
							<div className="info-price">
								<p>
									<span className="orange">{price}</span> / Person
								</p>
								<div className="qty">
									<button onClick={decrement} className="qty-btn">
										-
									</button>
									<p>{count}</p>
									<button onClick={increment} className="qty-btn">
										+
									</button>
								</div>
							</div>
							<div className="total">
								<p>Total :</p>
								<p>{totalPrice}</p>
							</div>
							<div>
								<button
									onClick={
										state.isLogin
											? () => {
													handleBook();
											  }
											: handleShow
									}
									className="total-btn"
								>
									BOOK NOW
								</button>
								<LoginModals handleClose={handleClose} show={show} />
							</div>
						</div>
					) : (
						<div className="mt-5"></div>
					)}
				</div>
			</div>
			<Footer />
		</>
	);
};
// () => history.push('/payment')

export default DetailTrip;
