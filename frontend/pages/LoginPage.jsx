import { useRef } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const LoginPage = () => {
	const emailRef = useRef(null);
	const passwordRef = useRef(null);
	const { login } = useAuth();

	const handleSubmit = async (e) => {
		e.preventDefault();
		login({
			email: emailRef.current.value,
			password: passwordRef.current.value,
		});
	};

	return (
		<div style={{ display: 'flex', flexDirection: 'column' }}>
			<h1>Login</h1>
			<form onSubmit={handleSubmit}>
				<div>
					<label>Email:</label>
					<input id='email' name='email' ref={emailRef} />
				</div>
				<div>
					<label>Password:</label>
					<input
						type='password'
						id='password'
						name='password'
						ref={passwordRef}
					/>
				</div>
				<div>
					<button type='submit'>Login</button>
				</div>
			</form>
			<div>
				Signup<Link to='/signup'>Here</Link>
			</div>
		</div>
	);
};

export default LoginPage;
