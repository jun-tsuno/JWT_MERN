const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const generateToken = (email) => {
	return jwt.sign({ email }, process.env.JWT_SECRET_KEY, {
		expiresIn: process.env.JWT_EXPIRES_IN,
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
	return res.status(201).json({ message: 'User successfully created!', user });
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

	return res.status(200).json({ message: 'Login successfully', token });
};

const user = async (req, res) => {
	const email = req.email;
	const user = await User.findOne({ email }).select('-password');

	if (!user) {
		return res.status(404).json({ message: 'No user' });
	}

	return res.status(200).json({ user });
};

module.exports = { signup, login, user };
