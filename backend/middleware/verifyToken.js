const jwt = require('jsonwebtoken');

// token validation could be used in multiple situation, so make a reusable middleware
const verifyToken = (req, res, next) => {
	try {
		const bearToken = req.headers['authorization'];
		const token = bearToken.split(' ')[1];
		if (!token) {
			return res.status(400).json({ message: 'No access token' });
		}

		jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
			if (err) {
				return res.status(400).json({ message: 'Not a valid token' });
			} else {
				req.email = decoded.email;
				// only when token is valid, proceed to next(find user)
				next();
			}
		});
	} catch (error) {
		return res.status(401).json({ message: error.message });
	}
};

module.exports = verifyToken;
