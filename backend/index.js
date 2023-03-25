const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const User = require('./models/userModel');

dotenv.config();

const app = express();
// express側でjsonを受け入れられるようにするmiddleware
app.use(express.json());

mongoose.connect(process.env.DATABASE_URI).then(() => {
	console.log('Database Connected');
});

app.post('/api/auth/signup', async (req, res) => {
	const { name, email, password } = req.body;
	const user = await User.create({
		name,
		email,
		password,
	});
	return res.status(201).json({ message: 'User created!', user });
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`listening on port ${port}`));
