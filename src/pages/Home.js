import { useState } from 'react';

import Content from '../components/Card/Content';
import Footer from '../components/Structure/Footer';
import Nav from '../components/Structure/Nav/Nav';
import GroupCards from '../components/Card/GroupCards';

const Home = () => {
	const [search, setSearch] = useState('');

	const handleOnChange = e => {
		setSearch(e.target.value);
	};

	return (
		<div>
			{/* Showcase start */}
			<header>
				<Nav />
				<div className="head-container">
					<div className="title">
						<h1>Explore</h1>
						<p>your amazing city together</p>
					</div>
					<div className="search">
						<p className="search-desc">Find great places to holiday</p>
						<div className="input-group mb-3">
							<input
								onChange={handleOnChange}
								type="text"
								className="ms-3 search-box"
							/>
							<button className="search-btn" type="button" id="button-addon2">
								Search
							</button>
						</div>
					</div>
				</div>
			</header>
			{/* end */}
			<Content />
			<div className="group">
				<div className="group-title">
					<h1>Group Title</h1>
				</div>
				<GroupCards search={search} />
			</div>
			<Footer />
		</div>
	);
};

export default Home;
