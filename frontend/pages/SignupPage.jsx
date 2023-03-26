import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

const SignupPage = () => {
	const nameRef = useRef(null);
	const emailRef = useRef(null);
	const passwordRef = useRef(null);
	const { signup } = useAuthContext();

	const handleSubmit = async (e) => {
		e.preventDefault();
		signup({
			name: nameRef.current.value,
			email: emailRef.current.value,
			password: passwordRef.current.value,
		});
	};

	return (
		<div style={{ display: 'flex', flexDirection: 'column' }}>
			<h1>Registration</h1>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor='name'>Name:</label>
					<input id='name' name='name' ref={nameRef} />
				</div>
				<div>
					<label htmlFor='email'>Email:</label>
					<input id='email' name='email' ref={emailRef} />
				</div>
				<div>
					<label htmlFor='password'>Password:</label>
					<input
						type='password'
						id='password'
						name='password'
						ref={passwordRef}
					/>
				</div>
				<div>
					<button type='submit'>Sign Up</button>
				</div>
			</form>
			<div>
				Login <Link to='/login'>Here</Link>
			</div>
		</div>
	);
};

export default SignupPage;
