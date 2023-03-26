import React from 'react';
import { useAuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Header = () => {
	const { user } = useAuthContext();
	return (
		<div style={{ display: 'flex', justifyContent: 'space-between' }}>
			<h1>
				<Link to='/'>MERN</Link>
			</h1>
			<div>
				{user ? (
					<div>
						<span>{user.email}</span>
					</div>
				) : (
					<div>
						<Link to='/login'>Login</Link>
						<Link to='/signup'>Signup</Link>
					</div>
				)}
			</div>
		</div>
	);
};

export default Header;
