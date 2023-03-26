import { createContext, useContext, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import axios from 'axios';

const AuthContext = createContext();

// ページをリロードしてもログイン状態を保持する（右上にメールアドレスを表示し続ける）ために、
// context内でlocalstorageからトークンを取得、getUser()にてユーザー情報を取得しstateに入れる。

export const AuthContextProvider = ({ children }) => {
	const { user, setUser, login, signup, getUser } = useAuth();

	useEffect(() => {
		const token = localStorage.getItem('token');
		console.log('context!');

		if (token) {
			axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
			getUser();
		} else {
			setUser(null);
		}
	}, [getUser, setUser]);

	return (
		<AuthContext.Provider value={{ user, login, signup }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuthContext = () => {
	return useContext(AuthContext);
};
