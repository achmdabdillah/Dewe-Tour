import { Redirect, Route } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const UserRoute = ({ component: Component, ...rest }) => {
	const { state } = useContext(AuthContext);
	return (
		<>
			<Route
				{...rest}
				render={props =>
					state.isLogin ? <Component {...props} /> : <Redirect to="/" />
				}
			/>
		</>
	);
};

const AdminRoute = ({ component: Component, ...rest }) => {
	const { state } = useContext(AuthContext);
	return (
		<>
			<Route
				{...rest}
				render={props =>
					state.user.status === 'admin' ? (
						<Component {...props} />
					) : (
						<Redirect to="/" />
					)
				}
			/>
		</>
	);
};

export { UserRoute, AdminRoute };
