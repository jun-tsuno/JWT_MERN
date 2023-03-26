import React from 'react';
import { useAuthContext } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
	const { user } = useAuthContext();

	if (user === undefined) {
		return <p>Loading...</p>;
	}

	if (!user) {
		return <Navigate to={'/login'} />;
	}

	return children;
};

export default ProtectedRoute;
