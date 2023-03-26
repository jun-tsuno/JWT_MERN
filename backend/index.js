const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRouter = require('./routes/authRoutes');
const userRouter = require('./routes/userRoutes');
const cors = require('cors');

dotenv.config();

const app = express();
// express側でjsonを受け入れられるようにするmiddleware
app.use(express.json());
app.use(cors());

app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);

mongoose.connect(process.env.DATABASE_URI).then(() => {
	console.log('Database Connected');
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`listening on port ${port}`));
