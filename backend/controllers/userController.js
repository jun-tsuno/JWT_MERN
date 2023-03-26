const User = require('../models/userModel');

const getUsers = async (req, res) => {
	const users = await User.find().select('name email');

	return res.status(200).json({ users });
};

module.exports = getUsers;
