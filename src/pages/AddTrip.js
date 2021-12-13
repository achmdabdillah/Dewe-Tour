import { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import Swal from 'sweetalert2';
import Nav from '../components/Structure/Nav/Nav';
import Footer from '../components/Structure/Footer';
import Loader from 'react-loader-spinner';

import { API } from '../config/api';

const AddTrip = () => {
	const history = useHistory();
	const [countries, setCountries] = useState([]);
	const [preview, setPreview] = useState([]);
	const [inputTrip, setInputTrip] = useState({
		title: '',
		idCountry: 0,
		accomodation: '',
		transportation: '',
		eat: '',
		day: '',
		night: '',
		dateTrip: '',
		price: 0,
		quota: 0,
		description: '',
		images: [],
	});

	const getCountries = async () => {
		try {
			const response = await API.get('/countries');
			setCountries(response.data.data.countries);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getCountries();
	}, []);

	const handleOnChange = e => {
		setInputTrip(prevState => ({
			...prevState,
			[e.target.id]: e.target.type === 'file' ? e.target.files : e.target.value,
		}));
		if (e.target.type === 'file') {
			const fileList = e.target.files;

			const showImages = [];
			if (!fileList) {
				setPreview([]);
			}

			for (const file of fileList) {
				showImages.push(URL.createObjectURL(file));
			}

			setPreview(showImages);
		}
	};

	const [isLoading, setIsLoading] = useState(false);

	const handleOnSubmit = async e => {
		e.preventDefault();
		setIsLoading(true);
		try {
			const config = {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			};

			const formData = new FormData();

			const fileList = inputTrip.images;
			for (let i = 0; i < fileList.length; i++) {
				formData.append('images', fileList[i]);
			}
			formData.set('title', inputTrip.title);
			formData.set('idCountry', inputTrip.idCountry);
			formData.set('accomodation', inputTrip.accomodation);
			formData.set('transportation', inputTrip.transportation);
			formData.set('eat', inputTrip.eat);
			formData.set('day', inputTrip.day);
			formData.set('night', inputTrip.night);
			formData.set('dateTrip', inputTrip.dateTrip);
			formData.set('price', inputTrip.price);
			formData.set('quota', inputTrip.quota);
			formData.set('description', inputTrip.description);

			// Insert data trip to database here ...
			const response = await API.post('/trips', formData, config);
			if (response?.status === 200) {
				Swal.fire({
					icon: 'success',
					title: 'Success',
					text: 'Trip added',
				});
				setIsLoading(false);
				history.push('/');
			}
		} catch (error) {
			if (error) throw error;
			Swal.fire({
				icon: 'error',
				title: 'Oops..',
				text: 'Something went wrong',
			});
		}
	};
	return (
		<>
			{isLoading ? (
				<div className="container">
					<div className="d-flex justify-content-center align-items-center fs-4 vh-100">
						<Loader type="ThreeDots" color="#FFAF00" height={80} width={80} />
						<h3>Uploading trip ...</h3>
					</div>
				</div>
			) : (
				<>
					<Nav />
					<div className="add-trip-body">
						<div className="container my-5">
							<h1>Add Trip</h1>
						</div>
						<form onSubmit={handleOnSubmit}>
							<label htmlFor="title">Title Trip</label>
							<input
								type="text"
								className="input-group"
								id="title"
								onChange={handleOnChange}
								value={inputTrip.title}
							/>
							<label htmlFor="accomodation">Accomodation</label>
							<input
								type="text"
								className="input-group"
								id="accomodation"
								onChange={handleOnChange}
								value={inputTrip.accomodation}
							/>
							<label htmlFor="transportation">Transportation</label>
							<input
								type="text"
								className="input-group"
								id="transportation"
								onChange={handleOnChange}
								value={inputTrip.transportation}
							/>
							<label htmlFor="eat">Eat</label>
							<input
								type="text"
								className="input-group"
								id="eat"
								onChange={handleOnChange}
								value={inputTrip.eat}
							/>
							<label htmlFor="idCountry">Country</label>
							<select
								name="idCountry"
								id="idCountry"
								className="input-group avenir-thin"
								onChange={handleOnChange}
							>
								<option value="choose" selected disabled>
									Choose country..
								</option>
								{countries?.map(country => (
									<option value={country?.id}>{country?.name}</option>
								))}
							</select>
							<label htmlFor="duration">Duration</label>
							<div className="d-flex">
								<input
									type="text"
									id="day"
									className="duration"
									onChange={handleOnChange}
									value={inputTrip.day}
								/>
								<label htmlFor="day" className="ms-3">
									Day
								</label>
								<input
									type="text"
									id="night"
									className="ms-5 duration"
									onChange={handleOnChange}
									value={inputTrip.night}
								/>
								<label htmlFor="night" className="ms-3">
									Night
								</label>
							</div>
							<label htmlFor="dateTrip">Date Trip</label>
							<input
								type="date"
								className="input-group"
								id="dateTrip"
								onChange={handleOnChange}
								value={inputTrip.dateTrip}
							/>
							<label htmlFor="price">Price</label>
							<input
								type="text"
								className="input-group"
								id="price"
								onChange={handleOnChange}
								value={inputTrip.price}
							/>
							<label htmlFor="quota">Quota</label>
							<input
								type="text"
								className="input-group"
								id="quota"
								onChange={handleOnChange}
								value={inputTrip.quota}
							/>
							<div className="d-flex flex-column">
								<label htmlFor="description">Description</label>
								<textarea
									name="description"
									id="description"
									onChange={handleOnChange}
									value={inputTrip.description}
								/>
							</div>
							<p>Image</p>
							<input
								type="file"
								id="images"
								placeholder="Attach file"
								className="filestyle"
								onChange={handleOnChange}
								multiple
							/>
							<label htmlFor="images" className="justify-content-between">
								<div className="btn attach-btn d-flex justify-content-between">
									<p href="" className="avenir status-orange">
										Attach Here
									</p>
									<img src="/assets/paperclip.png" alt="" className="ms-5" />
								</div>
							</label>
							<div className="preview-cards">
								{preview.map(item => (
									<>
										<img src={item} alt="preview" className="box-lg" />
									</>
								))}
							</div>
							<button className="form-btn">Add Trip</button>
						</form>
					</div>
					<Footer />
				</>
			)}
		</>
	);
};

export default AddTrip;
