import { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router';
import Loader from 'react-loader-spinner';
import { AuthContext } from '../../context/AuthContext';

import { API } from '../../config/api';

const GroupCards = ({ search }) => {
	const { state } = useContext(AuthContext);
	const history = useHistory();

	const [data, setData] = useState([]);
	console.log(data);

	const handleClickDetail = id => {
		history.push(`/detail/${id}`);
	};

	const formatter = value => {
		return new Intl.NumberFormat('en-ID', {
			style: 'currency',
			currency: 'IDR',
		}).format(value);
	};

	const getData = async () => {
		try {
			const response = await API.get('/trips');

			setData(response.data.data);
		} catch (error) {
			console.log('Cannot get data');
		}
	};

	useEffect(() => {
		const timer = setTimeout(() => {
			getData();
		}, 500);
		return () => clearTimeout(timer);
	}, []);

	return (
		<>
			{data.length < 1 ? (
				<div className="container">
					<div className="d-flex justify-content-center align-items-center">
						<Loader type="ThreeDots" color="#FFAF00" height={320} width={80} />
					</div>
				</div>
			) : (
				<div class="tour-cards">
					{state.user.status !== 'admin' ? (
						<>
							{data
								.filter(
									item =>
										(item?.title
											?.toLowerCase()
											.includes(search.toLowerCase()) &&
											item?.quotaFilled < item?.quota) ||
										(item?.country?.name
											?.toLowerCase()
											.includes(search.toLowerCase()) &&
											item?.quotaFilled < item?.quota)
								)
								.reverse()
								.map(trip => (
									<div
										className={
											trip?.quotaFilled <= trip?.quota
												? 'group-card pointer'
												: 'group-card block'
										}
										onClick={
											trip?.quotaFilled <= trip?.quota
												? () => handleClickDetail(trip.id)
												: ''
										}
									>
										<img src={trip?.images[0]} alt=""></img>
										<div class="counter">
											<p>
												{trip?.quotaFilled ? trip?.quotaFilled : 0} /{' '}
												{trip?.quota}
											</p>
										</div>
										<p className="tour">{trip?.title}</p>
										<div class="card-text">
											<p className="price">{formatter(trip.price)}</p>
											<p className="country">{trip?.country?.name}</p>
										</div>
									</div>
								))}
						</>
					) : (
						<>
							{data
								.filter(
									item =>
										item?.title?.toLowerCase().includes(search.toLowerCase()) ||
										item?.country?.name
											?.toLowerCase()
											.includes(search.toLowerCase())
								)
								.reverse()
								.map(trip => (
									<div
										className={
											trip?.quotaFilled < trip?.quota
												? 'group-card pointer'
												: 'group-card pointer fullybooked'
										}
										onClick={() => handleClickDetail(trip.id)}
									>
										<img src={trip?.images[0]} alt=""></img>
										<div class="counter">
											<p>
												{trip?.quotaFilled ? trip?.quotaFilled : 0} /{' '}
												{trip?.quota}
											</p>
										</div>
										<p className="tour">{trip?.title}</p>
										<div class="card-text">
											<p className="price">
												{formatter(trip?.price * trip?.quotaFilled)}
											</p>
											<p className="country">{trip?.country?.name}</p>
										</div>
									</div>
								))}
						</>
					)}
				</div>
			)}
		</>
	);
};

export default GroupCards;
