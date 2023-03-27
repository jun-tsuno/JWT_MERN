const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const generateToken = (email) => {
	return jwt.sign({ email }, process.env.JWT_SECRET_KEY, {
		expiresIn: process.env.JWT_EXPIRES_IN,
	});
};

const generateRefreshToken = (email) => {
	return jwt.sign({ email }, process.env.REFRESH_TOKEN_SECRET_KEY, {
		expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
	});
};

const signup = async (req, res) => {
	const { name, email, password } = req.body;
	const salt = await bcrypt.genSalt();
	const passwordHash = await bcrypt.hash(password, salt);
	const user = await User.create({
		name,
		email,
		password: passwordHash,
	});

	const token = generateToken(user.email);
	const refresh_token = generateRefreshToken(user.email);

	return res
		.status(201)
		.json({ message: 'User successfully created!', token, refresh_token });
};

const login = async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });
	if (!user) {
		return res.status(400).json({ message: 'User not found' });
	}

	const matchPassword = await bcrypt.compare(password, user.password);
	if (!matchPassword) {
		return res.status(400).json({ message: 'Password not matched' });
	}

	const token = generateToken(user.email);
	const refresh_token = generateRefreshToken(user.email);

	// Give back token so that the client can access with that token
	return res
		.status(200)
		.json({ message: 'Login successfully', token, refresh_token });
};

const user = async (req, res) => {
	const email = req.email;
	const user = await User.findOne({ email }).select('-password');

	if (!user) {
		return res.status(404).json({ message: 'No user' });
	}

	return res.status(200).json({ user });
};

const refreshToken = async (req, res) => {
	const { refresh_token } = req.body;
	console.log('refresh_token', req.body.refresh_token);

	jwt.verify(
		refresh_token,
		process.env.REFRESH_TOKEN_SECRET_KEY,
		(err, decoded) => {
			if (err) {
				return res.status(401).json({ message: 'Not a valid token!' });
			} else {
				const email = decoded.email;
				const token = generateToken(email);

				return res.status(200).json({ message: 'Issued new token', token });
			}
		}
	);
};

module.exports = { signup, login, user, refreshToken };
