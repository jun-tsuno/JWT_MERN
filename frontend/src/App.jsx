import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from '../pages/HomePage';
import SignupPage from '../pages/SignupPage';
import LoginPage from '../pages/LoginPage';
import Header from '../components/Header';
import ProtectedRoute from '../components/ProtectedRoute';

function App() {
	return (
		<>
			<Header />
			<div
				className='App'
				style={{ display: 'flex', justifyContent: 'center', marginTop: '3em' }}
			>
				<Routes>
					<Route
						path='/'
						element={
							<ProtectedRoute>
								<HomePage />
							</ProtectedRoute>
						}
					/>
					<Route path='/signup' element={<SignupPage />} />
					<Route path='/login' element={<LoginPage />} />
				</Routes>
			</div>
		</>
	);
}

export default App;
