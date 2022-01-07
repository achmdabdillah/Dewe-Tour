import { useState, useEffect } from 'react';
import Nav from '../components/Structure/Nav/Nav';
import Footer from '../components/Structure/Footer';
import Swal from 'sweetalert2';

import { API } from '../config/api';

const ListTransaction = () => {
	const [proof, setProof] = useState('');
	const proofModal = item => {
		setProof(item);
	};

	// Get Transaction Data
	const [data, setData] = useState([]);

	const getData = async () => {
		try {
			const response = await API.get('/transactions');

			setData(response.data.data.transactions);
		} catch (error) {
			alert('Cannot get data');
		}
	};

	useEffect(() => {
		getData();
	}, []);

	const formatter = function (amount) {
		return new Intl.NumberFormat('en-ID', {
			style: 'currency',
			currency: 'IDR',
		}).format(amount);
	};

	const [detailModal, setDetailModal] = useState({});

	const handleModal = item => {
		setDetailModal({
			id: item?.id,
			qty: item?.counterQty,
			total: item?.total,
			status: item?.status,
			attachment: item?.attachment,
			bookDateData: item?.createdAt,

			idTrip: item?.idTrip,
			title: item?.trip?.title,
			accomodation: item?.trip?.accomodation,
			transportation: item?.trip?.transportation,
			country: item?.trip?.country?.name,
			dateTripData: item?.trip?.dateTrip,
			day: item?.trip?.day,
			night: item?.trip?.night,
			quota: item?.trip?.quota,
			quotaFilled: item?.trip?.quotaFilled,

			fullName: item?.user?.fullName,
			phone: item?.user?.phone,
		});
	};

	const dateFormatter = inputDate => {
		let data = new Date(inputDate).toString();
		const newDate = data.split(' ');
		return newDate.slice(0, 4);
	};

	const bookDate = dateFormatter(detailModal?.bookDateData);
	const dateTrip = dateFormatter(detailModal?.dateTripData);

	// UPDATE TRANSACTION
	const updateData = async (id, status, qty) => {
		try {
			// Configuration
			const config = {
				headers: {
					'Content-type': 'application/json',
				},
			};

			const statusUpdate = JSON.stringify({ status });
			console.log(statusUpdate);
			if (
				status === 'Approved' &&
				detailModal.quotaFilled + qty <= detailModal.quota
			) {
				await API.patch(`/transactions/${id}`, statusUpdate, config);

				const addQuota = JSON.stringify({
					quotaFilled: detailModal?.quotaFilled + qty,
				});
				await API.patch(`/trips/${detailModal?.idTrip}`, addQuota, config);
			} else if (
				status === 'Cancelled' &&
				detailModal.quotaFilled + qty <= detailModal.quota
			) {
				await API.patch(`/transactions/${id}`, statusUpdate, config);
			} else {
				const cancel = JSON.stringify({ status: 'Cancelled' });
				await API.patch(`/transactions/${id}`, cancel, config);
				Swal.fire({
					icon: 'error',
					title: 'Failed',
					text: 'Insufficient quota to continue this payment',
				});
			}
			setDetailModal({});
			getData();
		} catch (error) {
			alert('Cannot get data');
		}
	};
	return (
		<>
			<Nav />
			<div className="nav-container list-margin-top">
				<div className="d-flex flex-column">
					<h1 className="list-title">Incoming Transaction</h1>
					<table className="transaction-tbl">
						<tr>
							<th>No</th>
							<th>Users</th>
							<th>Trip</th>
							<th>Bukti Transfer</th>
							<th>Status Payment</th>
							<th>Action</th>
						</tr>
						{data
							.filter(item => item?.status !== 'Waiting Payment')
							.reverse()
							.map((item, i) => (
								<>
									<tr>
										<td>{i + 1}</td>
										<td>{item?.user?.fullName}</td>
										<td>{item?.trip?.title}</td>
										{/* start */}
										<td>
											<img
												data-bs-toggle="modal"
												data-bs-target="#proofModal"
												onClick={() => {
													proofModal(item?.attachment);
												}}
												className="box-sm pointer"
												src={item?.attachment}
												alt="no payment"
											/>
											<div className="modal fade" id="proofModal">
												<div className="modal-dialog modal-dialog-centered">
													<div className="modal-content">
														<img
															className="paymentProofPic img-fluid"
															src={proof}
															alt="no payment"
														/>
													</div>
												</div>
											</div>
										</td>
										{/* ends */}
										<td>
											<span
												className={
													item?.status === 'Approved'
														? 'roboto-bold status-green'
														: item?.status === 'Cancelled'
														? 'roboto-bold status-red'
														: 'roboto-bold status-orange'
												}
											>
												{item?.status}
											</span>
										</td>
										<td
											className="pointer"
											data-bs-toggle="modal"
											data-bs-target="#exampleModal"
										>
											<img
												src="/assets/lup.png"
												alt=""
												onClick={() => handleModal(item)}
											/>
										</td>
									</tr>
								</>
							))}
					</table>
				</div>
				{/* PAYMENT MODALS START */}
				<div className="modal fade" id="exampleModal">
					<div className="modal-dialog custom">
						<div className="modal-content custom">
							{/* PAYMENT CARD START */}
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
											<h1>{detailModal.title}</h1>
											<p>{detailModal.country}</p>
											<p>
												<span
													className={
														detailModal?.status === 'Approved'
															? 'payment-status status-green bg-green'
															: detailModal?.status === 'Cancelled'
															? 'payment-status status-red bg-red'
															: 'payment-status status-orange bg-orange'
													}
												>
													{detailModal.status}
												</span>
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
														{detailModal.day} Day {detailModal.night} Night
													</p>
												</div>
												<div className="col pbody-info">
													<h1>Accomodation</h1>
													<p>{detailModal.accomodation}</p>
												</div>
												<div className="col pbody-info">
													<h1>Transportation</h1>
													<p>{detailModal.transportation}</p>
												</div>
											</div>
										</div>
										<div className="pbody-end">
											<label htmlFor="proof">
												<img
													className="box"
													src={
														detailModal.attachment
															? detailModal.attachment
															: '/assets/struk.png'
													}
													alt=""
												/>
											</label>
											<input
												type="file"
												id="proof"
												name="attachment"
												className="filestyle"
											></input>
											<p>upload payment proof</p>
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
													<td>{detailModal.fullName}</td>
													<td>Male</td>
													<td>{detailModal.phone}</td>
													<td className="avenir">
														Qty<span className="px-5">:</span>
													</td>
													<td className="avenir">{detailModal.qty}</td>
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
														{formatter(detailModal.total)}
													</td>
												</tr>
											</table>
										</div>
									</div>
								</div>
							</div>
							{detailModal?.status === 'Waiting Approve' ? (
								<div className="d-flex end mt-2 modal-approve">
									<div>
										<button
											data-bs-dismiss="modal"
											className="modal-action-btn me-5 avenir action-red"
											onClick={() => {
												updateData(
													detailModal?.id,
													'Cancelled',
													detailModal.qty
												);
											}}
										>
											Cancel
										</button>
										<button
											data-bs-dismiss="modal"
											className="modal-action-btn avenir action-green"
											onClick={() => {
												updateData(
													detailModal?.id,
													'Approved',
													detailModal.qty
												);
											}}
										>
											Approve
										</button>
									</div>
								</div>
							) : (
								<div className="d-flex end mt-2 modal-approve"></div>
							)}
							{/* PAYMENT CARD END */}
						</div>
					</div>
				</div>
				{/* PAYMENT MODALS END */}
			</div>
			<Footer />
		</>
	);
};

export default ListTransaction;
