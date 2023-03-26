import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from '../pages/HomePage';
import SignupPage from '../pages/SignupPage';
import LoginPage from '../pages/LoginPage';

function App() {
	return (
		<div
			className='App'
			style={{ display: 'flex', justifyContent: 'center', marginTop: '3em' }}
		>
			<Routes>
				<Route path='/' element={<HomePage />} />
				<Route path='/signup' element={<SignupPage />} />
				<Route path='/login' element={<LoginPage />} />
			</Routes>
		</div>
	);
}

export default App;
