import { useHistory } from 'react-router';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const UserDropdown = () => {
	const { state, dispatch } = useContext(AuthContext);
	const history = useHistory();

	const handleToProfile = () => {
		history.push('/profile');
	};

	const handleToPayment = () => {
		history.push('/payment');
	};

	const profile = state?.user?.profilePicture;
	console.log(state);
	return (
		<ul className="navbar-nav">
			<li className="nav-item dropdown">
				<a
					className="nav-link dropdown-toggle"
					href
					id="navbarDarkDropdownMenuLink"
					role="button"
					data-bs-toggle="dropdown"
					aria-expanded="false"
				>
					<img
						className="box-sm circle"
						src={profile !== null ? profile : '/images/Avatar.png'}
						alt=""
					/>
				</a>
				<ul
					className="dropdown-menu dropdown-menu-end"
					aria-labelledby="navbarDarkDropdownMenuLink"
				>
					<li onClick={handleToProfile} className="pointer">
						<img src="/assets/user2.png" alt="" className="me-3" />
						<p className="avenir">Profile</p>
					</li>
					<li onClick={handleToPayment} className="pointer">
						<img src="/assets/bill1.png" alt="" className="me-3" />
						<p className="avenir">Pay</p>
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

export default UserDropdown;
