import { useState, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const useAuth = () => {
	const [user, setUser] = useState();
	const navigate = useNavigate();

	const signup = async (data) => {
		try {
			const response = await axios.post('/auth/signup', data);
			const token = response.data.token;
			// set the token in the header, verify access next time user are required to show token
			axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
			getUser();
			navigate('/');
		} catch (error) {
			console.log(error);
		}
	};

	const login = async (data) => {
		try {
			const response = await axios.post('/auth/login', data);
			const token = response.data.token;
			// set the token in the header, verify access
			axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
			await localStorage.setItem('token', token);
			await getUser();
			navigate('/');
		} catch (error) {
			console.log(error);
		}
	};

	// return login user
	const getUser = useCallback(async () => {
		try {
			const response = await axios.get('/auth/user');
			setUser(response.data.user);
		} catch (error) {
			console.log(error);
		}
	}, []);

	return { user, setUser, signup, login, getUser };
};

export default useAuth;
