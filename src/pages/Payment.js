import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Nav from '../components/Structure/Nav/Nav';
import Footer from '../components/Structure/Footer';

import Swal from 'sweetalert2';
import { API } from '../config/api';

const Payment = () => {
	// PAYMENT PAGES
	const [data, setData] = useState([]);
	const hide = e => {
		e.target.style.backgroundColor = 'transparent';
		e.target.style.color = 'transparent';
	};

	const getData = async () => {
		try {
			const response = await API.get(`/transaction`);
			setData(response.data.data);
		} catch (error) {
			alert('Cannot get data');
		}
	};

	useEffect(() => {
		getData();
	}, []);

	const waitingPayment = data?.filter(
		item => item?.status === 'Waiting Payment'
	);
	const lastData = waitingPayment.slice(waitingPayment.length - 1);

	const [form, setForm] = useState(null);
	const [preview, setPreview] = useState(null);

	const handleOnChange = e => {
		if (e.target.type === 'file') {
			setForm(e.target.files);

			let url = URL.createObjectURL(e.target.files[0]);
			setPreview(url);
		}
	};

	const handlePayment = async id => {
		if (!form) {
			Swal.fire({
				icon: 'error',
				title: 'Failed',
				text: 'please insert payment proof',
			});
			return;
		} else {
			try {
				const config = {
					headers: {
						'Content-type': 'multipart/form-data',
					},
				};

				const data = new FormData();
				data.set('image', form[0], form[0].name);
				data.set('status', 'Waiting Approve');

				await API.patch(`/transactions/${id}`, data, config);
				getData();
			} catch (error) {
				console.log(error);
			}
		}
	};

	// PAYMENT CARD

	const dateFormatter = inputDate => {
		let data = new Date(inputDate).toString();
		const newDate = data.split(' ');
		return newDate.slice(0, 4);
	};

	const bookDate = dateFormatter(lastData[0]?.createdAt);
	const dateTrip = dateFormatter(lastData[0]?.trip?.dateTrip);

	const formatter = function (amount) {
		return new Intl.NumberFormat('en-ID', {
			style: 'currency',
			currency: 'IDR',
		}).format(amount);
	};

	return (
		<div>
			<Nav />
			{!lastData?.length ? (
				<div className="no-payment">
					<img src="/assets/no-payment.png" alt="" />
					<h1 className="avenir fs-1">No Payment To Show</h1>
				</div>
			) : (
				<>
					{lastData?.map((item, i) => (
						<>
							<div className="payment-ticket">
								<div className="payment-container">
									<div className="payment-header d-flex justify-content-between">
										<img src="/assets/logo-dewe-bl.png" alt="" />
										<div>
											<h1>Booking</h1>
											<p>
												<strong>{bookDate[0]}</strong>, {bookDate[2]}{' '}
												{bookDate[1]} {bookDate[3]}
											</p>
										</div>
									</div>
									<div className="payment-body d-flex">
										<div className="pbody-title">
											<h1>{item?.trip?.title}</h1>
											<p>{item?.trip?.country?.name}</p>
											<p>
												<span className="payment-status">{item?.status}</span>
											</p>
										</div>
										<div className="pbody-center container">
											<div className="row row-cols-2">
												<div className="col pbody-info">
													<h1>Date Trip</h1>
													<p>
														{dateTrip[0]}, {dateTrip[2]} {dateTrip[1]}{' '}
														{dateTrip[3]}
													</p>
												</div>
												<div className="col pbody-info">
													<h1>Duration</h1>
													<p>
														{item?.trip?.day} Day {item?.trip?.night} Night
													</p>
												</div>
												<div className="col pbody-info">
													<h1>Accomodation</h1>
													<p>{item?.trip?.accomodation}</p>
												</div>
												<div className="col pbody-info">
													<h1>Transportation</h1>
													<p>{item?.trip?.transportation}</p>
												</div>
											</div>
										</div>
										<div className="pbody-end" id={i}>
											<img
												className="box"
												src={preview ? preview : '/assets/struk.png'}
												alt=""
											/>
											<label htmlFor="image">
												<div>
													<input
														type="file"
														id="image"
														className="pointer avenir-thin fs-6 pointer a"
														name="image"
														onChange={handleOnChange}
													></input>
													<p>upload payment proof</p>
												</div>
											</label>
										</div>
									</div>
									<div className="payment-end">
										<div className="payment-table">
											<table>
												<tr>
													<th>No</th>
													<th>Full Name</th>
													<th>Gender</th>
													<th>Phone</th>
													<th></th>
													<th></th>
												</tr>
												<tr className="tdata">
													<td>1</td>
													<td>{item?.user?.fullName}</td>
													<td>Male</td>
													<td>{item?.user?.phone}</td>
													<td className="avenir">
														Qty<span className="px-5">:</span>
													</td>
													<td className="avenir">{item?.counterQty}</td>
												</tr>
												<tr className="t-end">
													<td></td>
													<td></td>
													<td></td>
													<td></td>
													<td className="avenir">
														Total<span className="px-5">:</span>
													</td>
													<td className="avenir red">
														{formatter(item.total)}
													</td>
												</tr>
											</table>
										</div>
									</div>
								</div>
							</div>
							<div className="d-block end">
								{form ? (
									<button
										onClick={e => {
											handlePayment(item?.id);
											hide(e);
										}}
										data-bs-toggle="modal"
										data-bs-target="#exampleModal"
										className="pay-btn fs-5"
									>
										Pay
									</button>
								) : (
									<button
										onClick={() => {
											handlePayment(item?.id);
										}}
										className="pay-btn fs-5"
									>
										Pay
									</button>
								)}
							</div>
						</>
					))}
					{/* modals start */}
					<div
						className="modal fade"
						id="exampleModal"
						tabindex="-1"
						aria-labelledby="exampleModalLabel"
						aria-hidden="true"
					>
						<div className="modal-dialog modal-dialog-centered">
							<div className="modal-content transparent">
								<div className="modal-body popup">
									<p>
										Your payment will be confirmed within 1 x 24 hours To see
										orders click
										<Link to="/profile">
											<strong className="pointer ms-1">Here</strong>
										</Link>{' '}
										thank you
									</p>
								</div>
							</div>
						</div>
					</div>
					{/* end */}
				</>
			)}
			<Footer />
		</div>
	);
};

export default Payment;
