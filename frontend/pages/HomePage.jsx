import React, { useState, useEffect } from 'react';
import axios from '../utils/axios';
import { useAuthContext } from '../context/AuthContext';

const HomePage = () => {
	const [users, setUsers] = useState([]);
	const { logout } = useAuthContext();

	useEffect(() => {
		const getUsers = async () => {
			try {
				const response = await axios.get('/users');
				setUsers(response.data.users);
			} catch (error) {
				console.log(error);
				// delete login info when error occur after user login
				logout();
			}
		};
		getUsers();
	}, []);

	return (
		<div>
			<h1>Home</h1>
			<ul>
				{users &&
					users.map((user) => {
						return (
							<li key={user._id}>
								Name: {user.name} / Email: {user.email}
							</li>
						);
					})}
			</ul>
		</div>
	);
};

export default HomePage;
